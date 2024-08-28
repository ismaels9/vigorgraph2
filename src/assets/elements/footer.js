import React, { useState } from 'react';
import imagemLogo from '../Images/Logo.png';

const Footer = () => {

  return (
    <div className="footer">
        <div>
        <img src={imagemLogo} alt="Descrição da Imagem" />
        <p>CNPJ: 35.070.730/0001-43</p>
        </div>
        <div>
        <p>E-mail: vigorgraph@gmail.com</p>
        <p>Telefone: (85) 99837-2010</p>
        </div>
    </div>

  );
}

export default Footer;
