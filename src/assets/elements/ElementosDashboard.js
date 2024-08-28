import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ImageUploader from './ImageUploader';

function ElementosDashboard(usuario) {
    const [nome, setNome] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [email, setEmail] = useState('');
    const [perfil, setPerfil] = useState('Analista');
    const [CNPJ, setCNPJ] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const password = Math.random().toString(36).substr(2, 6);
    const [imagens, setImagens] = useState([]);
    const handleSubmitUsuario = async (event) => {
        event.preventDefault();
        await setDoc(doc(db, "Users", email), {
            Nome: nome,
            Empresa: empresa,
            email: email,
            Perfil: perfil
        })
        createUserWithEmailAndPassword(auth, email, password)
    };
    const onSave = (images) => {
        setImagens((prev) => [...prev,...images])
    }

    const removeImage = (index) => {
        const newImagens = [...imagens]; // Create a copy of the imagens array
        newImagens.splice(index, 1); // Remove the image at the specified index
        setImagens(newImagens); // Update the state with the new array
    }

    const handleSubmitEmpresa = async (event) => {
        event.preventDefault();
        await setDoc(doc(db, "Company", CNPJ), {
            CNPJ: CNPJ,
            NomeFantasia: nomeFantasia,
        });
    };

    if (usuario.Perfil === "Administrador") {
        return (
            <div className='formCadastro'>
                <form onSubmit={handleSubmitUsuario}>
                    <p className='formCadastroTitulo'>CADASTRO DE USUÁRIO</p>

                    <div className='labelFormCadastro'>
                        <label >
                            Nome:
                            <input
                                type="text"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                            />
                        </label>
                    </div>
                    <div className='labelFormCadastro'>
                        <label>
                            Empresa:
                            <input
                                type="text"
                                value={empresa}
                                onChange={(event) => setEmpresa(event.target.value)}
                            />
                        </label>
                    </div>
                    <div className='labelFormCadastro'>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </label>
                    </div>
                    <div className='labelFormCadastro'>
                        <label>
                            Perfil:
                            <select value={perfil} onChange={(event) => setPerfil(event.target.value)}>
                                <option value="Analista">Analista</option>
                                <option value="Gerente">Gerente</option>
                            </select>
                        </label>
                    </div>
                    <button type="submit">Enviar</button>
                </form>

                <form onSubmit={handleSubmitEmpresa}>
                    <p className='formCadastroTitulo'>CADASTRO DE EMPRESA</p>

                    <div className='labelFormCadastro'>
                        <label>
                            CNPJ:
                            <input
                                type="text"
                                value={CNPJ}
                                onChange={(event) => setCNPJ(event.target.value)}
                            />
                        </label>
                    </div>
                    <div className='labelFormCadastro'>
                        <label>
                            Nome Fantasia:
                            <input
                                type="text"
                                value={nomeFantasia}
                                onChange={(event) => setNomeFantasia(event.target.value)}
                            />
                        </label>
                    </div>
                    <button type="submit">Enviar</button>
                </form>

            </div>
        )
    } else if (usuario.Perfil === "Analista") {
        return (
            <div className='DashBoardAnalista'>
                <div className='MenuDashboard'>
                    <div className='iconesDash'>
                        <FontAwesomeIcon icon={faUser} className="IconeLogin" />
                        <FontAwesomeIcon icon={faUser} className="IconeLogin" />
                        <FontAwesomeIcon icon={faUser} className="IconeLogin" />

                    </div>
                    <div className='iconesDash'>
                        <FontAwesomeIcon icon={faUser} className="IconeLogin" />
                        <FontAwesomeIcon icon={faUser} className="IconeLogin" />
                    </div>
                </div>
                <div className='DadosDashboard'>
                    <div className='Coluna'>
                        <p className='TextoPrincipal'>Adicionar imagens</p>
                        <ImageUploader onSave={onSave} />

                    </div>
                    <div className='Coluna'>
                        <p className='TextoPrincipal'>Ver Imagens adicionadas</p>
                        <div className='ImagensCarregadas'>
                        {imagens.map((image, index) => (
                            <div key={index} style={{ display: 'inline-block', margin: '5px', position: 'relative' }}>
                                <img
                                    src={image}
                                    alt={`Uploaded ${index}`}
                                    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '5px' }}
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    &#x2715;
                                </button>
                            </div>
                        ))}
                        </div>

                        <button className='botaoSaibaMais BotaoEntrarLogin'>Mandar Imagens para análise</button>


                    </div>

                </div>

            </div>
        )

    } else if (usuario.Perfil === "Gerente") {
        return (
            <div>
                <p>EU SOU BOCO</p>

            </div>
        )

    } else {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        )
    }
}

export default ElementosDashboard;
