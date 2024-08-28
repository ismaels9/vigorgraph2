import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importe o Chart.js como módulo

const GraficosResultado = ({ resultadoFinal }) => {
  const [dataVigor, setDataVigor] = useState(null);
  const [dataUniformidade, setDataUniformidade] = useState(null);
  const [dataProporcaoNG, setDataProporcaoNG] = useState(null);

  const chartRefs = useRef([]);

  useEffect(() => {
    // Limpa os gráficos anteriores ao atualizar os dados
    chartRefs.current.forEach((chart) => {
      if (chart instanceof Chart) {
        chart.destroy();
      }
    });
    chartRefs.current = [];

    if (resultadoFinal && resultadoFinal.length > 0) {
      const vigorData = {
        labels: resultadoFinal.map((item, index) => `Imagem ${index + 1}`),
        datasets: [
          {
            label: 'Vigor',
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: resultadoFinal.map((item) => parseFloat(item.vigor))
          }
        ]
      };

      const uniformidadeData = {
        labels: resultadoFinal.map((item, index) => `Imagem ${index + 1}`),
        datasets: [
          {
            label: 'Uniformidade',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: resultadoFinal.map((item) => parseFloat(item.uniformidade))
          }
        ]
      };

      const proporcaoNGData = {
        labels: resultadoFinal.map((item, index) => `Imagem ${index + 1}`),
        datasets: [
          {
            label: 'Proporção de Sementes Não Germinadas',
            backgroundColor: 'rgba(153,102,255,0.2)',
            borderColor: 'rgba(153,102,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(153,102,255,0.4)',
            hoverBorderColor: 'rgba(153,102,255,1)',
            data: resultadoFinal.map((item) => parseFloat(item.semente_n_g) / parseFloat(item.numero_plantulas))
          }
        ]
      };

      setDataVigor(vigorData);
      setDataUniformidade(uniformidadeData);
      setDataProporcaoNG(proporcaoNGData);
    }
  }, [resultadoFinal]);

  useEffect(() => {
    // Criação dos gráficos quando os dados estiverem disponíveis
    if (dataVigor) {
      const vigorChart = new Chart(chartRefs.current[0], {
        type: 'bar',
        data: dataVigor,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      chartRefs.current.push(vigorChart);
    }
    if (dataUniformidade) {
      const uniformidadeChart = new Chart(chartRefs.current[1], {
        type: 'bar',
        data: dataUniformidade,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      chartRefs.current.push(uniformidadeChart);
    }
    if (dataProporcaoNG) {
      const proporcaoNGChart = new Chart(chartRefs.current[2], {
        type: 'bar',
        data: dataProporcaoNG,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              max: 1,
              ticks: {
                stepSize: 0.1
              }
            }
          }
        }
      });
      chartRefs.current.push(proporcaoNGChart);
    }

    // Limpeza dos gráficos ao desmontar o componente
    return () => {
      chartRefs.current.forEach((chart) => {
        if (chart instanceof Chart) {
          chart.destroy();
        }
      });
      chartRefs.current = [];
    };
  }, [dataVigor, dataUniformidade, dataProporcaoNG]);

  // Renderização condicional enquanto os dados estão sendo carregados
  if (!dataVigor || !dataUniformidade || !dataProporcaoNG) {
    return <p>Carregando gráficos...</p>;
  }

  // Renderização dos gráficos quando os dados estiverem prontos
  console.log(dataProporcaoNG, dataVigor, dataUniformidade)
  return (
    <div className="graficos-container">
      <div className="grafico">
        <h2>Vigor</h2>
        <canvas className="canvas" ref={(ref) => (chartRefs.current[0] = ref)} />
      </div>
      <div className="grafico">
        <h2>Uniformidade</h2>
        <canvas className="canvas" ref={(ref) => (chartRefs.current[1] = ref) } />
      </div>
      <div className="grafico">
        <h2>Proporção de Sementes Não Germinadas</h2>
        <canvas className="canvas" ref={(ref) => (chartRefs.current[2] = ref)} />
      </div>
    </div>
  );
};

export default GraficosResultado;
