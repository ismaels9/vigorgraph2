import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassChart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import iconeAnalise from '../../assets/Images/icone-analises.png';
import { auth } from '../../firebase'; // Importe o objeto de autenticação do Firebase

function MenuLateral() {
    const navigate = useNavigate(); // Obter a função de navegação
    const location = useLocation(); // Obter a localização atual

    const handleLogout = async () => {
        try {
            await auth.signOut(); // Fazer logout usando o Firebase
            localStorage.clear(); // Limpar dados de autenticação local
            navigate('/'); // Redirecionar para a página de login
        } catch (error) {
            console.error('Erro ao fazer logout:', error.message);
        }
    };

    const getLinkClass = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <nav className='NavDashLateral'>
            <div className="MenuDashboard">
                <div className="iconesDash">
                    <Link to="/dashboard-analise" className={`iconeDash ${getLinkClass('/dashboard-analise')}`}>
                        <img src={iconeAnalise} alt="Ícone de Análise" className='IconeLateral' />
                    </Link>

                    <Link to="/dashboard-resumo" className={getLinkClass('/dashboard-resumo')}>
                        <FontAwesomeIcon icon={faMagnifyingGlassChart} className="IconeLateral" />
                    </Link>
                    <button onClick={handleLogout} className='BotaoLogOut'>
                        <FontAwesomeIcon icon={faSignOutAlt} className="IconeLateral" />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default MenuLateral;
