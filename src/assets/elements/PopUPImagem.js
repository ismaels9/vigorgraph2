// PopupImagem.js
import React from 'react';
import CanvasComponent from './Canvas2';

function PopupImagem({ imagem, hipocotilo, raiz, onClose }) {
  return (
    <div className="popupIMG">
      <div className="popup-inner-img">
        <CanvasComponent
          imageSrc={imagem}
          linha={hipocotilo}
          linha2={raiz}
        />
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default PopupImagem;
