import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import imagemLogo from '../Images/Logo.png';

const Menu = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('usuario')));
  const location = useLocation();

  const renderLoginOrDashboardLink = () => {
    if (!currentUser) {
      return (
        <Link to="/login" translate="no" className="TextoBotaoLogin">Login</Link>
      );
    } else {
      return (
        <Link to="/dashboard-analise" translate="no" className="TextoBotaoLogin">DashBoard</Link>
      );
    }
  };

  // Não renderiza o Menu se estiver na rota de login
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className='Nav'>
        <div className="LogoContainer">
          <Link to="/">
            <img src={imagemLogo} alt="Logo" className="Logo" />
          </Link>
        </div>
        <ul className="Menu-index">
          <li className="BotaoMenu">
            <Link to="/" translate="no" className="TextoBotao">Home</Link>
          </li>
          <li className="BotaoMenu">
            <Link to="/sobre" className="TextoBotao">Sobre</Link>
          </li>
          {/* <li className="BotaoMenu">
            <Link to="/contato" className="TextoBotao">Contato</Link>
          </li> */}
          <li className="BotaoLogin">
            {renderLoginOrDashboardLink()}
          </li>
        </ul>
    </nav>
  );
}

export default Menu;
