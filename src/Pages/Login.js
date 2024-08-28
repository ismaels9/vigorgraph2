import React, { useState } from "react";
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importe o Navigate
import imagemLeaf from '../assets/Images/leaf.png';
import imagemLogo from '../assets/Images/Logo.png';
import Menu from '../assets/elements/menu'


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Obter a função de navegação

    const handleLogIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const q = query(collection(db, "Users"), where("email", "==", auth.currentUser.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                localStorage.setItem('usuario', JSON.stringify(doc.data()));
            });
            navigate('/dashboard-analise'); // Redirecionar para a página de login
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Erro no Login" + error);
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Previne a submissão do formulário
        handleLogIn();
    }

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Um email para redefinição de senha foi enviado para o seu endereço de email.");
        } catch (error) {
            console.error("Error sending password reset email:", error);
            alert("Erro ao enviar email de redefinição de senha. Por favor, verifique seu endereço de email.");
        }
    }

    return (
        <div>
            <Menu />
            <div className="Principal">
                <div className='Column1'>
                </div>
                <div className='Column2'>
                    <p>Bem-vindo ao</p>

                    <img src={imagemLogo} className='ImagemLogo LogoLogin' alt="Logo" onClick={() => {navigate('/')}}/>
                    <form onSubmit={handleSubmit} className="FormLogin">
                        <div className="DivLogin">
                            <FontAwesomeIcon icon={faUser} className="IconeLogin" />
                            <input
                                className='InputLogin'
                                type="text"
                                placeholder="E-mail"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="DivLogin">
                            <FontAwesomeIcon icon={faLock} className="IconeLogin" />
                            <input
                                className='InputLogin'
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button className="BotaoEsqueciSenha" onClick={handleForgotPassword}>Esqueci a senha</button>

                        <button className="botaoSaibaMais BotaoEntrarLogin" type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;
