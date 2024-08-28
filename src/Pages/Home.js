import React from "react";
import imagemPlanta from '../assets/Images/VIGORGRAPH-02.png';
import Menu from '../assets/elements/menu'
import { useNavigate } from 'react-router-dom'; // Importe o Navigate


function Home() {
  const navigate = useNavigate(); // Obter a função de navegação

  const handleSaibaMais = () => {
    navigate('/sobre'); // Redirecionar para a página de login
  }
  return (
    <div className="divMaior">
      <Menu />
      <div className="Principal">
        <div className='Coluna1'>
          <div className='Textos'>
            <p className='Titulo'> Bem-Vindo(a)! </p>
            <p className='Texto'>O <span className='textoDif'>Vigorgraph</span> é um software de processamento de
              imagens de plântulas para sua rotina de trabalho.
            </p>
            <button className='botaoSaibaMais' onClick={handleSaibaMais}>Saiba mais</button>
          </div>
        </div>
        <div className='Coluna2'>
          <img src={imagemPlanta} className='ImagemPlanta animated' />
        </div>
      </div>
    </div>
  );
}
export default Home;