import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MenuLateral from '../assets/elements/menuLateralDash';
import { db } from '../firebase';
import { doc, writeBatch } from 'firebase/firestore';
import LoadingPopup from "../assets/elements/PopUp Carregamento";
import ProductDetails from "../assets/elements/ProductDetails";
import Menu from '../assets/elements/menu'
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Math from "math";

function Dashboard_Resultado() {
    const location = useLocation();
    const imagens = location.state?.imagens || [];
    const lote = location.state?.lote || '00000';
    const especie = location.state?.especie || 'sem_especie';
    const pasta = location.state?.pasta || 'a';
    const ppi = location.state?.ppi || [];
    const usuarioAutenticado = JSON.parse(localStorage.getItem('usuario'));
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [resultadoFinal, setResultadoFinal] = useState([]);
    const [selectedThumbnailIndexes, setSelectedThumbnailIndexes] = useState(0);
    const [hipocotilos, setHipocotilos] = useState([]);
    const [raiz, setRaiz] = useState([]);

    const handleThumbnailClick = (index) => {
        setSelectedThumbnailIndexes(index);
    };

    const calculaIndices = (resultado) => {
        let resultado_total = [];
        let hipocotilos_img = [];
        let raiz_img = [];
        imagens.sort((a, b) => a.name.localeCompare(b.name));
        // Converter objeto resultado em array, ordenar e reconverter para objeto
        const resultadoArray = Object.entries(resultado);
        resultadoArray.sort((a, b) => a[0].localeCompare(b[0]));
        const resultadoOrdenado = Object.fromEntries(resultadoArray);
        Object.entries(resultadoOrdenado).forEach((imagem, index) => {
            let hipocotilos_smt = []; // Pontos para traçar linha img
            let raiz_smt = []; // Pontos para traçar linha img
            let comprimentos = []; // Tabela de comprimentos
            let lista_CA = [];
            let lista_CA_pixel = []
            let lista_CR = [];
            let lista_CR_pixel = []
            let lista_CT = [];
            Object.entries(imagem[1].links).forEach((element) => {
                let CA = 0;
                let CA_pixel = 0;
                let CR = 0;
                let CR_pixel = 0
                let hipocotilo = element[1].hipocotilo;
                let raiz_prim = element[1].raiz_prim;
                let hipocotilo1 = hipocotilo === null ? [[0, 0]] : hipocotilo.map(coord => [coord[0] * imagens[index].width, coord[1] * imagens[index].height]);
                let raiz_prim1 = raiz_prim === null ? [[0, 0]] : raiz_prim.map(coord => [coord[0] * imagens[index].width, coord[1] * imagens[index].height]);
                hipocotilos_smt.push(hipocotilo1);
                raiz_smt.push(raiz_prim1);
                if (hipocotilo !== null) {
                    hipocotilo = hipocotilo.map(coord => [coord[0] * imagens[index].width, coord[1] * imagens[index].height]);
                    for (let i = 1; i < hipocotilo.length; i++) {
                        let dx = hipocotilo[i][0] - hipocotilo[i - 1][0];
                        let dy = hipocotilo[i][1] - hipocotilo[i - 1][1];
                        CA += Math.sqrt(dx * dx + dy * dy);
                    }
                    CA_pixel = CA;
                    CA /= ppi[index]; // Convertendo para milímetros
                }
                lista_CA.push(CA);
                lista_CA_pixel.push(CA_pixel);
                if (raiz_prim !== null) {
                    raiz_prim = raiz_prim.map(coord => [coord[0] * imagens[index].width, coord[1] * imagens[index].height]);
                    for (let i = 1; i < raiz_prim.length; i++) {
                        let dx = raiz_prim[i][0] - raiz_prim[i - 1][0];
                        let dy = raiz_prim[i][1] - raiz_prim[i - 1][1];
                        CR += Math.sqrt(dx * dx + dy * dy);
                    }
                    CR_pixel = CR;
                    CR /= ppi[index]; // Convertendo para milímetros
                }
                lista_CR_pixel.push(CR_pixel)
                lista_CR.push(CR);
            });
            for (let i = 0; i < lista_CA.length; i++) {
                let CA = parseFloat(lista_CA[i].toFixed(2));
                let CR = parseFloat(lista_CR[i].toFixed(2));
                let CT = parseFloat((lista_CR[i] + lista_CA[i]).toFixed(2));
                lista_CT.push(CT);
                let RC = parseFloat((lista_CA[i] / lista_CR[i]).toFixed(2));

                // Verificando NaN e infinito para cada variável
                if (isNaN(CA) || !isFinite(CA)) CA = '-';
                if (isNaN(CR) || !isFinite(CR)) CR = '-';
                if (isNaN(CT) || !isFinite(CT)) CT = '-';
                if (isNaN(RC) || !isFinite(RC)) RC = '-';

                let objeto = {
                    CA: CA,
                    CR: CR,
                    CT: CT,
                    RC: RC
                };

                comprimentos.push(objeto);
            }
            hipocotilos_img.push(hipocotilos_smt);
            raiz_img.push(raiz_smt);


            let numero_plantulas = imagem[1].numero_plantulas;
            let semente_n_g = imagem[1].numero_plantuas_ngerm;
            let pen = semente_n_g * (50 / numero_plantulas);
            let mediaH = lista_CA_pixel.filter(value => value !== 0).reduce((acc, curr) => acc + curr, 0) / lista_CA_pixel.filter(value => value !== 0).length;
            let mediaR = lista_CR_pixel.filter(value => value !== 0).reduce((acc, curr) => acc + curr, 0) / lista_CR_pixel.filter(value => value !== 0).length;
            let crescimento = Math.min((0.1 * mediaH + 0.9 * mediaR), 1000);
            let media_CT = lista_CT.filter(value => value !== 0).reduce((acc, curr) => acc + curr, 0) / lista_CT.filter(value => value !== 0).length;
            let somatorio = lista_CT.reduce((acc, curr) => acc + Math.abs(curr - media_CT), 0);
            let uniformidade = Math.max(0, (((1 - (somatorio / (numero_plantulas * media_CT))) * 1000) - pen)).toFixed(2);
            let vigor = (0.5 * crescimento + 0.5 * uniformidade).toFixed(2);
            resultado_total.push({ comprimentos, vigor, uniformidade, numero_plantulas, semente_n_g });
        });
        setHipocotilos(hipocotilos_img);
        setRaiz(raiz_img);
        setResultadoFinal(resultado_total);
        setIsLoading(false);
    };
    
    const exportToExcel = () => {
        const headers = ["Imagem", "Plântula", "CT", "CH", "CR", "Razão", "Vigor", "Uniformidade", "Qtd Plantulas", "N Germinada"];
        const rows = [];
        const merges = [];
    
        let currentRowIndex = 1; // Começa na linha 1, pois a linha 0 é para o cabeçalho
    
        resultadoFinal.forEach((documento, imgIndex) => {
            const { comprimentos, vigor, uniformidade, numero_plantulas, semente_n_g } = documento;
    
            // Adiciona uma linha de dados para cada plântula
            comprimentos.forEach((item, plantulaIndex) => {
                const { CA, CR: CR_valor, CT, RC } = item;
                rows.push([
                    plantulaIndex === 0 ? imagens[imgIndex].name : '',   // Nome da imagem (mescla verticalmente)
                    plantulaIndex + 1,        // Número da plântula
                    CT || '',                 // Comprimento Total (CT)
                    CA || '',                 // Comprimento Hipocotilo (CH)
                    CR_valor || '',           // Comprimento Raiz (CR)
                    RC || '',                 // Razão CA/CR
                    plantulaIndex === 0 ? vigor : '',  // Vigor (mescla verticalmente)
                    plantulaIndex === 0 ? uniformidade : '',  // Uniformidade (mescla verticalmente)
                    plantulaIndex === 0 ? numero_plantulas : '',  // Quantidade de Plântulas (mescla verticalmente)
                    plantulaIndex === 0 ? semente_n_g : ''  // Semente Não Germinada (mescla verticalmente)
                ]);
    
                // Define o intervalo de mesclagem para as colunas "Imagem", "Vigor", "Uniformidade", "Qtd Plantulas", "N Germinada"
                if (plantulaIndex === 0) {
                    merges.push({ s: { r: currentRowIndex, c: 0 }, e: { r: currentRowIndex + comprimentos.length - 1, c: 0 } }); // Imagem
                    merges.push({ s: { r: currentRowIndex, c: 6 }, e: { r: currentRowIndex + comprimentos.length - 1, c: 6 } }); // Vigor
                    merges.push({ s: { r: currentRowIndex, c: 7 }, e: { r: currentRowIndex + comprimentos.length - 1, c: 7 } }); // Uniformidade
                    merges.push({ s: { r: currentRowIndex, c: 8 }, e: { r: currentRowIndex + comprimentos.length - 1, c: 8 } }); // Qtd Plantulas
                    merges.push({ s: { r: currentRowIndex, c: 9 }, e: { r: currentRowIndex + comprimentos.length - 1, c: 9 } }); // N Germinada
                }
    
                currentRowIndex++;
            });
    
            // Adiciona uma linha em branco após cada grupo de plântulas para a imagem
            rows.push([]);
            currentRowIndex++;
        });
    
        // Adiciona o cabeçalho
        rows.unshift(headers);
    
        // Cria a planilha
        const ws = XLSX.utils.aoa_to_sheet(rows);
    
        // Define as mesclagens de células
        ws['!merges'] = merges;
    
        // Cria o livro de trabalho
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    
        // Gera o arquivo e salva
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `analise_${lote}.xlsx`);
    };

    const processImages = async () => {
        setIsLoading(true);
        try {
            const data = {
                folder: pasta
            };
            const response = await fetch('https://square-frog-optimal.ngrok-free.app/process_images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                if (response.status !== 500) {
                    alert("Erro ao processar imagens. Voltando para página inicial");
                    setRedirectToHome(true);
                }
                throw new Error('Failed to process images');
            }
            const responseData = await response.json();
            console.log('Processed images:', responseData);
            calculaIndices(responseData);
        } catch (error) {
            console.error('Error processing images:', error.message);
        }
    };

    useEffect(() => {
        if (!usuarioAutenticado || imagens == [] || pasta === "a") {
            setRedirectToHome(true);
            return;
        } else {
            processImages();
            console.log(imagens)
        }
    }, []);

    if (redirectToHome) {
        return <Navigate to="/" replace />;
    }

    if (isLoading) {
        return <LoadingPopup />;
    }

    const formatarData = () => {
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const salvarAnalise = async () => {
        try {
            const batch = writeBatch(db);
            const dataAtual = formatarData();
            const analise = uuidv4();

            resultadoFinal.forEach((item, index) => {
                const analiseRef = doc(db, "Analysis", `${analise}_${index + 1}`);
                const dadosAnalise = {
                    analise: analise,
                    imagem: imagens[index].name,
                    lote: lote,
                    analista: usuarioAutenticado.Nome,
                    data: dataAtual,
                    especie: especie,
                    ...item
                };
                batch.set(analiseRef, dadosAnalise);
            });
            await batch.commit();
            alert("Análise salva com Sucesso!")
            console.log("Análises salvas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar análises:", error);
        }
    }

    return (
        <div>
            <Menu />
            <div className='DashBoardAnalista'>
                <MenuLateral />
                <div className="table-container">
                    <ProductDetails
                        resultado={resultadoFinal}
                        selectedThumbnailIndex={selectedThumbnailIndexes}
                        onThumbnailClick={handleThumbnailClick}
                        hipocotilo={hipocotilos}
                        raiz={raiz}
                        images={imagens}
                    />

                    <div className="Botoes">
                        <button className="SalvarAnaliseButton" onClick={exportToExcel}>
                            Exportar para Excel
                        </button>
                        <button className="SalvarAnaliseButton" onClick={salvarAnalise}>Salvar Análise</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_Resultado;