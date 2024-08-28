import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import Menu from '../assets/elements/menu';
import MenuLateral from '../assets/elements/menuLateralDash';
import AnaliseDetails from '../assets/elements/ProductDetailsResumo';
import AnaliseRow from '../assets/elements/ProductRow';


function Dashboard_Resumo() {
    const [analisesAgrupadas, setAnalisesAgrupadas] = useState({});
    const [expandedAnaliseId, setExpandedAnaliseId] = useState(null);
    const [selectedThumbnailIndexes, setSelectedThumbnailIndexes] = useState({});
    const [analista, setAnalista] = useState('');
    const [data, setData] = useState('');
    const [especie, setEspecie] = useState('');
    const [analistas, setAnalistas] = useState([]);
    const [especies, setEspecies] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [analisesFiltradas, setAnalisesFiltradas] = useState([]);
    const usuarioAutenticado = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        const buscarValoresUnicos = async () => {
            try {
                const analistasSet = new Set();
                const especiesSet = new Set();

                documentos.forEach((doc) => {
                    const data = doc.data();
                    analistasSet.add(data.analista);
                    especiesSet.add(data.especie);
                });

                setAnalistas(Array.from(analistasSet));
                setEspecies(Array.from(especiesSet));
            } catch (error) {
                console.error('Erro ao buscar valores únicos:', error);
            }
        };

        if (documentos.length > 0) {
            buscarValoresUnicos();
        }
    }, [documentos]);

    useEffect(() => {
        filtrarValores();
    }, [analista, especie, data]);

    useEffect(() => {
        agrupaDocumentos();
    }, [documentos]);

    useEffect(() => {
        if (usuarioAutenticado.Perfil === 'Analista') {
            setAnalista(usuarioAutenticado.Nome);
        }
    }, [usuarioAutenticado]);

    const renderizarCampoAnalista = () => {
        if (usuarioAutenticado.Perfil === 'Analista') {
            return null;
        }

        return (
            <select value={analista} onChange={(e) => setAnalista(e.target.value)} className="Dropdown-select">
                <option value="">Todos os Analistas</option>
                {analistas.map((analista) => (
                    <option key={analista} value={analista}>{analista}</option>
                ))}
            </select>
        );
    };

    const filtrarValores = () => {
        const analisesFiltradas = {};

        Object.entries(analisesAgrupadas).forEach(([analiseId, analises]) => {
            const primeiroDocumento = analises[0];
            const { analista: analistaDocumento, data: dataDocumento, especie: especieDocumento } = primeiroDocumento;

            const dataFormatada = data ? data.split('-').reverse().join('/') : '';

            if (
                (!analista || analistaDocumento === analista) &&
                (!data || dataDocumento === dataFormatada) &&
                (!especie || especieDocumento === especie)
            ) {
                analisesFiltradas[analiseId] = analises;
            }
        });

        setAnalisesFiltradas(analisesFiltradas);
    };

    const agrupaDocumentos = () => {
        const dadosAgrupados = {};

        // Ordena os documentos pela data
        const documentosOrdenados = documentos.slice().sort((a, b) => {
            const dataA = new Date(a.data().data.split('/').reverse().join('-'));
            const dataB = new Date(b.data().data.split('/').reverse().join('-'));
            return dataB - dataA;
        });

        documentosOrdenados.forEach(doc => {
            const data = doc.data();
            const analiseId = data.analise;

            if (!dadosAgrupados[analiseId]) {
                dadosAgrupados[analiseId] = [];
            }
            dadosAgrupados[analiseId].push({ id: doc.id, ...data });
        });

        setAnalisesAgrupadas(dadosAgrupados);
        setAnalisesFiltradas(dadosAgrupados);
    };

    const buscarAnalises = async () => {
        try {
            let q = query(collection(db, 'Analysis'));
            const querySnapshot = await getDocs(q);
            setDocumentos(querySnapshot.docs);
        } catch (error) {
            console.error('Erro ao buscar análises:', error);
        }
    };

    useEffect(() => {
        buscarAnalises();
    }, []);

    const toggleDetails = (analiseId) => {
        setExpandedAnaliseId(expandedAnaliseId === analiseId ? null : analiseId);
        if (expandedAnaliseId !== analiseId) {
            setSelectedThumbnailIndexes(prevState => ({ ...prevState, [analiseId]: 0 }));
        }
    };

    const handleThumbnailClick = (analiseId, index) => {
        setSelectedThumbnailIndexes(prevState => ({ ...prevState, [analiseId]: index }));
    };

    return (
        <div>
            <Menu />
            <MenuLateral />
            <div className='resumo'>
                <div className="grupo1">
                    {renderizarCampoAnalista()}
                    <input
                        type="date"
                        placeholder="Data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="Dropdown-select"
                    />
                    <select value={especie} onChange={(e) => { setEspecie(e.target.value) }} className="Dropdown-select">
                        <option value="">Todas as Espécies</option>
                        {especies.map((especie) => (
                            <option key={especie} value={especie}>{especie}</option>
                        ))}
                    </select>
                </div>
                <div className="tabela">
                    <div className="custom-table">
                        <div className="header-row">
                            <div>ID</div>
                            <div>Analista</div>
                            <div>Lote</div>
                            <div>Data</div>
                            <div>Espécie</div>
                            <div>   </div>
                        </div>
                        {Object.entries(analisesFiltradas).map((analise) => (
                            <React.Fragment key={analise[0]}>
                                <AnaliseRow
                                    analise={analise}
                                    toggleDetails={toggleDetails}
                                    isExpanded={expandedAnaliseId === analise[0]}
                                />
                                {expandedAnaliseId === analise[0] && (
                                    <AnaliseDetails
                                        resultado={analise}
                                        selectedThumbnailIndex={selectedThumbnailIndexes[analise[0]] || 0}
                                        onThumbnailClick={(index) => handleThumbnailClick(analise[0], index)}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_Resumo;
