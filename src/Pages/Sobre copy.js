import React from "react";
import img1 from '../assets/Images/Img2.jpeg'
import img2 from '../assets/Images/fsfdasdasd.png'
import img3 from '../assets/Images/fsfdasdad.png'
import img4 from '../assets/Images/img3.jpeg'
import alvo from '../assets/Images/alvo.png'
import escudo from '../assets/Images/escudo.png'
import padrao from '../assets/Images/padrão.png'
import speed from '../assets/Images/speed.png'
import Menu from '../assets/elements/menu'


function Sobre() {
  return (
    <div>
       <Menu/>
    <div className="container">
      <body className='Body-sobre'>
        <section>
          <h2>Software de Processamento de Imagens</h2>
          <p>
            Na Vigorgraph, nossa missão é clara: revolucionar a forma como as plantas são avaliadas, proporcionando aos agricultores e pesquisadores uma ferramenta confiável, ágil e precisa para garantir o sucesso das safras. Estamos constantemente olhando para o futuro, vislumbrando um mundo onde nossa tecnologia promova uma agricultura mais eficiente e sustentável.
          </p>

          <div className="grid-container">
            <div className="card">
              <img src={escudo} alt="Confiabilidade" />
              <h3 className="texto-card">Confiabilidade</h3>
            </div>

            <div className="card">
              <img src={speed} alt="Agilidade" />
              <h3 className="texto-card">Agilidade</h3>
            </div>

            <div className="card">
              <img src={alvo} alt="Precisão" />
              <h3 className="texto-card">Precisão</h3>
            </div>

            <div className="card">
              <img src={padrao} alt="Padronização" />
              <h3 className="texto-card">Padronização</h3>
            </div>
          </div>
        </section>

        <section className="two-column-section">
          <div className="left-column">
            <h2>Avalia o Desempenho de Plântulas de Algodão</h2>
            <p>Possibilita obter informações sobre a qualidade das sementes antes da primeira contagem de germinação.</p>
          </div>
          <div className="right-column-sobre">
            <img src={img1} alt="Descrição da Imagem" />
          </div>
        </section>

        <section>
          <h2 className="fluxograma-texto">Fluxograma de Análise</h2>
          <div class="fluxograma">
            <div class="passo">
              <h3>01 - Captura das Imagens</h3>
              <p>Sistema de captura próprio;
                Permite padronização de imagens;
                Obtenção de imagens de alta qualidade;
              </p>
            </div>
            <div class="passo">
              <h3>02 - Banco de Imagens</h3>
              <p>Identificação adequada das imagens;</p>
            </div>
            <div class="passo">
              <h3>03 - Processamento de Imagens</h3>
              <p>Variáveis - físicas e fisiológicas;</p>
            </div>
            <div class="passo">
              <h3>04 - Relatório Inteligente</h3>
              <p>Planilha no Excel;
                Dados organizados;
                Gráficos informativos.</p>
            </div>
          </div>

        </section>

        <section className="two-column-section">
          <div className="left-column">
            <h2>Inovação</h2>
            <p>Identificação das plântulas, marcação de suas partes de forma identificada e obtenção dos parâmetros de crescimento e vigor</p>
          </div>
          <div className="right-column-sobre">
            <img className="imgCOt" src={img2} alt="Descrição da Imagem" />
          </div>
        </section>

        <section className="two-column-section-2">
          <img src={img3} alt="Descrição da Imagem" />
          <div className="left-column">
            <h2>Características Técnicas</h2>
            <p>Análise de conjunto de imagens, background de diferentes cores, flexibilidade no número de plântulas, flexibilidade na orientação das plântulas e um interface amigável.</p>
          </div>
          <div className="right-column-sobre">
            <div class="flux-2">
              <div class="passo1">
                <h3>Reconhecimento</h3>
              </div>
              <div class="passo1">
                <h3>Identificação</h3>
              </div>
              <div class="passo1">
                <h3>Coleta de Dados</h3>
              </div>
              <div class="passo1">
                <h3>Relatório</h3>
              </div>
            </div>

          </div>
        </section>

        <section>
          <h2>Classificação Vigor dos Lotes</h2>
          <img className="img4" src={img4} alt="Descrição da Imagem" />
          <div class="fluxograma">
            <div class="passo2">
              <h3>Baixo Vigor</h3>
            </div>
            <div class="passo2">
              <h3>Desenvolvimento</h3>
            </div>
            <div class="passo2">
              <h3>Alto Vigor</h3>
            </div>
            <div class="passo2">
              <h3>Desenvolvimento Uniforme</h3>
            </div>
          </div>
        </section>

        <section className="two-column-section">
          <div className="left-column">
            <h2 className="h2-left">Principais Vantagens</h2>
            <ul>
        <li>Análises automatizadas</li>
        <li>Inserção de inovação em análises</li>
        <li>Maior agilidade na obtenção de resultados</li>
        <li>Parâmetros de qualidade exclusivos</li>
        <li>Formação de um banco de imagens</li>
        <li>Maior autonomia na tomada de decisão</li>
    </ul>
            </div>
          <div className="right-column-sobre">
            <img src={img1} alt="Descrição da Imagem" />
          </div>
        </section>


      </body>
    </div>
    </div>

  );
}
export default Sobre;
