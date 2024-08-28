import React from "react";
import img1 from '../assets/Images/Img2.jpeg'
import o from '../assets/Images/o.png'
import img2 from '../assets/Images/Raiz.png'
import imagemCanto from '../assets/Images/leaf.png'

import img3 from '../assets/Images/fsfdasdad.png'
import img4 from '../assets/Images/caracteristicas.png'
import alvo from '../assets/Images/alvo.png'
import escudo from '../assets/Images/escudo.png'
import padrao from '../assets/Images/padrão.png'
import Menu from '../assets/elements/menu'
import { LiaSitemapSolid } from "react-icons/lia";
import Footer from "../assets/elements/footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGaugeHigh, faBullseye, faHandshakeSimple, faClone, faSitemap} from "@fortawesome/free-solid-svg-icons";


function Sobre() {
  return (
    <div className="divMaior">
      <Menu />
      <div className="container">
        <section className="secao">
          <div className="colunaMenorSecao">
            <p className="textoSobre">Software de <br />Processamento <br />de Imagens</p>
            <p>
              Na Vigorgraph, nossa missão é clara: revolucionar a forma como as plantas são avaliadas, proporcionando aos agricultores e pesquisadores uma ferramenta confiável, ágil e precisa para garantir o sucesso das safras. Estamos constantemente olhando para o futuro, vislumbrando um mundo onde nossa tecnologia promova uma agricultura mais eficiente e sustentável.
            </p>
          </div>
          <div className="colunaMaiorSecao">
              <div className="card left">
              <FontAwesomeIcon icon={faHandshakeSimple} size='2x' />
                <p>CONFIABILIDADE</p>
              </div>

              <div className="card right">
              <FontAwesomeIcon icon={faGaugeHigh} size='2x' />
              <p>AGILIDADE</p>
              </div>

              <div className="card left">
              <FontAwesomeIcon icon={faBullseye} size='2x' />
                <p >PRECISÃO</p>
              </div>

              <div className="card right">
              <FontAwesomeIcon icon={faClone} size='2x' />
                <p >PADRONIZAÇÃO</p>
              </div>          
              </div>
        </section>
        <section className="two-column-section algodao">
          <div className="cima">
            <p>AVALIA O DESEMPENHO DE < br/> PLÂNTULAS DE ALGODÃO E SOJA</p>
          </div>
          <div className="baixo">
          <p>POSSIBILITA OBTER INFORMAÇÕES SOBRE < br/> A QUALIDADE DAS SEMENTES ANTES DA < br/> PRIMEIRA CONTAGEM DE GERMINAÇÃO.</p>

          </div>

        </section>
        <section style={{backgroundColor:"#054D2D", height: "450px"}}>
        <div className="TituloComIcone">
        <LiaSitemapSolid size={80}/>
        <p>FLUXOGRAMA DE ANÁLISE</p>
        </div>
          <div class="fluxograma">
            <div class="passo">
              <h3>CAPTURA DAS IMAGENS</h3> 
              <p>- Sistema de captura próprio<br/>
                - Permite padronização de imagens<br/>
                - Obtenção de imagens de alta qualidade
              </p>
            </div>
            <div class="passo">
              <h3>BANCO DE IMAGENS</h3>
              <p>- Identificação adequada das imagens</p>
            </div>
            <div class="passo">
              <h3>PROCESSAMENTO DE IMAGENS</h3>
              <p> -Variáveis - físicas e fisiológicas</p>
            </div>
            <div class="passo">
              <h3>RELATÓRIO INTELIGENTE</h3>
              <p>- Planilha no Excel< br/>
                - Dados organizados< br/>
                - Gráficos informativos.</p>
            </div>
          </div>

        </section>
        <section className="two-column-section inovacao">
        <div className="colunaMenorSecaoInovacao">
            <img className="imgCOt" src={img2} alt="Descrição da Imagem" />
          </div>
          <div className="colunaMaiorSecaoInovacao">
            <p className="textoSobre">Inovação</p>
            <div className="cardInovacao"><img src={o} alt="Descrição da Imagem" /><p>Identificação das plântulas</p></div>
            <div className="cardInovacao"><img src={o} alt="Descrição da Imagem" /><p>Marcação de suas partes de forma identificada</p></div>
            <div className="cardInovacao"><img src={o} alt="Descrição da Imagem" /><p>Obtenção dos parâmetros de crescimento e vigor</p></div>
            <img src={imagemCanto} alt="Descrição da Imagem" />
          </div>
        </section>
        <section className="two-column-section-2">
          <img src={img3} alt="Descrição da Imagem" />
          <div className="left-column">
            <p className="textoSobre">Características Técnicas</p>
            <p>- Análise de conjunto de imagens <br/>- Background de diferentes cores<br/>- Flexibilidade no número de plântulas<br/>- Flexibilidade na orientação das plântulas<br/>- Interface amigável.</p>
          </div>
          <div className="right-column-sobre">
            <div class="flux-2">
              <div class="passo1">
                <p>Reconhecimento</p>
              </div>
              <div class="passo1">
                <p>Identificação</p>
              </div>
              <div class="passo1">
                <p>Coleta de Dados</p>
              </div>
              <div class="passo1">
                <p>Relatório</p>
              </div>
            </div>

          </div>
        </section>
        <section>
          <p className="textoSobre">Classificação Vigor dos Lotes</p>
          <img className="img4" src={img4} alt="Descrição da Imagem" />
          <div class="fluxograma">
            <div class="passo2">
              <p>Baixo Vigor</p>
            </div>
            <div class="passo2">
              <p>Desenvolvimento Desuniforme</p>
            </div>
            <div class="passo2">
              <p>Alto Vigor</p>
            </div>
            <div class="passo2">
              <p>Desenvolvimento Uniforme</p>
            </div>
          </div>
        </section>

        <section className="two-column-section ultima-secao-sobre">
          <div className="left-column ">
            <p className="h2-left">Principais Vantagens</p>
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


      </div>
      <Footer/>
    </div>

  );
}
export default Sobre;
