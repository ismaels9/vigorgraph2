import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import BarChart from './BarChart';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function ProductDetails({ resultado, selectedThumbnailIndex, onThumbnailClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chartData, setChartData] = useState({ ct: [], ca: [], cr: [], vigor: [] });

  useEffect(() => {
    console.log(resultado)
    setIsExpanded(selectedThumbnailIndex !== null);
    if (resultado[1] && resultado[1].length > 0) {
      calculateAverages(resultado[1]);
    }
  }, [selectedThumbnailIndex, resultado]);

  const calculateAverages = (data) => {
    let mediaCT = [], mediaCA = [], mediaCR = [], vigor = [];
    data.forEach(item => {
      let ctSum = 0, caSum = 0, crSum = 0;
      item.comprimentos.forEach(semente => {
        ctSum += parseFloat(semente.CT);
        caSum += parseFloat(semente.CA);
        crSum += parseFloat(semente.CR);
      });
      mediaCT.push(ctSum / item.numero_plantulas);
      mediaCA.push(caSum / item.numero_plantulas);
      mediaCR.push(crSum / item.numero_plantulas);
      vigor.push(parseFloat(item.vigor));
    });

    setChartData({
      ct: mediaCT,
      ca: mediaCA,
      cr: mediaCR,
      vigor: vigor,
    });
  };

  const preparaDados = (label, value) => {
    let labels = [];
    let dataset = [
      {
        label: label,
        data: value,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ];
    value.forEach((item, index) => {
      labels.push(index + 1);
    });
    return generateChartData(labels, dataset);
  };

  const generateChartData = (labels, dataset) => ({
    labels: labels,
    datasets: dataset,
  });

  const exportToExcel = () => {
    const headers = ["Imagem", "Plântula", "CT", "CH", "CR", "Razão", "Vigor", "Uniformidade", "Qtd Plantulas", "N Germinada"];
    const rows = [];
    const merges = [];

    let currentRowIndex = 1; // Começa na linha 1, pois a linha 0 é para o cabeçalho

    resultado[1].forEach((documento, imgIndex) => {
      const { comprimentos, vigor, uniformidade, numero_plantulas, semente_n_g, imagem} = documento;

      // Adiciona uma linha de dados para cada plântula
      comprimentos.forEach((item, plantulaIndex) => {
        const { CA, CR: CR_valor, CT, RC } = item;
        rows.push([
          plantulaIndex === 0 ? imagem : '',   // Nome da imagem (mescla verticalmente)
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
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `analise_resultado.xlsx`);
  };

  return (
    <div className={`margin10 details ${isExpanded ? 'expanded' : ''}`}>
      <div className="details-inside">
        <div className="left-column">
          {resultado[1] && resultado[1].length > 0 && (
            <React.Fragment>
              <div className='divide'>
                {resultado[1].map((item, index) => (
                  <div key={index} onClick={() => onThumbnailClick(index)} className='divItens'>
                    <FontAwesomeIcon icon={faSeedling} className="IconeLateral" />
                    <strong>{index + 1} - {item.imagem}</strong>
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="right-column">
          <h3 className='detalhesAnalise'>Detalhes da Análise</h3>
          <ul className='detalhes'>
            <strong>Comprimentos:</strong>
            <div className="comprimentos">
              <div className="table-row table-header">
                <div className="table-cell">Plântula</div>
                <div className="table-cell">Comprimento Total</div>
                <div className="table-cell">Comprimento Hipocótilo</div>
                <div className="table-cell">Comprimento Raiz</div>
                <div className="table-cell">Razão H/R</div>
              </div>
              {resultado[1][selectedThumbnailIndex].comprimentos.map((semente, index) => (
                <div className="table-row" key={index}>
                  <div className="table-cell">{index + 1}</div>
                  <div className="table-cell">{semente.CT}</div>
                  <div className="table-cell">{semente.CA}</div>
                  <div className="table-cell">{semente.CR}</div>
                  <div className="table-cell">{semente.RC}</div>
                </div>
              ))}
            </div>

            {isExpanded && (
              <>
                <li><strong>Vigor:</strong> {resultado[1][selectedThumbnailIndex].vigor}</li>
                <li><strong>Uniformidade:</strong> {resultado[1][selectedThumbnailIndex].uniformidade}</li>
                <li><strong>N.º de Plântulas:</strong> {resultado[1][selectedThumbnailIndex].numero_plantulas}</li>
                <li><strong>N.º Sementes não Germinadas:</strong> {resultado[1][selectedThumbnailIndex].semente_n_g}</li>
              </>
            )}
          </ul>
        </div>
        {isExpanded && (
          <div className="charts">
            <BarChart data={preparaDados("Média de Comprimento Total", chartData.ct)} title="Comprimento Total Médio (CT)" />
            <BarChart data={preparaDados("Média de Comprimento Hipocótilo", chartData.ca)} title="Comprimento Hipocótilo Médio (CA)" />
            <BarChart data={preparaDados("Média de Comprimento Raiz", chartData.cr)} title="Comprimento Raiz Médio (CR)" />
            <BarChart data={preparaDados("Vigor", chartData.vigor)} title="Vigor Médio" />
          </div>
        )}
      </div>
      <div className='Centraliza'>
      <button onClick={exportToExcel} className="SalvarAnaliseButton">Exportar para Excel</button>

      </div>
    </div>
  );
}

export default ProductDetails;
