import React, { useState, useEffect } from 'react';
import CanvasComponent from './Canvas';
import PopupImagem from './PopUPImagem'; // Importe o componente PopupImagem

function ProductDetails({ images, resultado, selectedThumbnailIndex, onThumbnailClick, hipocotilo, raiz }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedHipocotilo, setSelectedHipocotilo] = useState(null);
  const [selectedRaiz, setSelectedRaiz] = useState(null);
  const [highlightedLine, setHighlightedLine] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0); // Estado para armazenar o ângulo de rotação

  useEffect(() => {
    setIsExpanded(selectedThumbnailIndex !== null);
    console.log(resultado)
  }, [selectedThumbnailIndex]);

  const handleOpenPopup = (image, hipocotilo, raiz) => {
    setSelectedImage(image);
    setSelectedHipocotilo(hipocotilo);
    setSelectedRaiz(raiz);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
    setPopupOpen(false);
  };

  const rotateImage = (direction) => {
    setRotationAngle(prevAngle => direction === 'left' ? prevAngle - 90 : prevAngle + 90);
  };

  if (!images || !resultado || selectedThumbnailIndex === null) {
    return null;
  }

  const selectedImageDetails = images[selectedThumbnailIndex];
  const selectedResultado = resultado[selectedThumbnailIndex];

  return (
    <div className={`details ${isExpanded ? 'expanded' : ''}`}>
      <div className="details-inside">
        <div className="left-column">
          {images.length > 0 && (
            <>
              <CanvasComponent
                imageSrc={selectedImageDetails.url}
                hipocotilo={hipocotilo[selectedThumbnailIndex]}
                raiz={raiz[selectedThumbnailIndex]}
                highlightedLine={highlightedLine}
                rotationAngle={rotationAngle} // Passar o ângulo de rotação para o CanvasComponent
                onClick={() => handleOpenPopup(selectedImageDetails.url, hipocotilo[selectedThumbnailIndex], raiz[selectedThumbnailIndex])}
              />
              <div className="thumbnails">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`${image.name} - Thumbnail ${index + 1}`}
                    onClick={() => onThumbnailClick(index)}
                    className={selectedThumbnailIndex === index ? 'thumbnail active' : 'thumbnail'}
                  />
                ))}
              </div>
{/*              <div className="rotation-buttons">
                <button onClick={() => rotateImage('left')}>Rotate Left</button>
                <button onClick={() => rotateImage('right')}>Rotate Right</button>
              </div>*/}
            </>
          )}
        </div>
        <div className="right-column">
          <h3 className='detalhesAnalise'>Detalhes da Análise</h3>
          <ul className='detalhes'>
            <li><strong>Nome:</strong> {selectedImageDetails.name}</li>

            <strong>Comprimentos:</strong>
            <div className="comprimentos">
              <div className="table-row table-header">
                <div className="table-cell">Plântula</div>
                <div className="table-cell">Comprimento Total</div>
                <div className="table-cell">Comprimento Hipocótilo</div>
                <div className="table-cell">Comprimento Raiz</div>
                <div className="table-cell">Razão H/R</div>
              </div>
              {selectedResultado.comprimentos.map((semente, index) => (
                <div
                  className="table-row"
                  key={index}
                  onMouseEnter={() => setHighlightedLine(index)}
                  onMouseLeave={() => setHighlightedLine(null)}
                >
                  <div className="table-cell">{index + 1}</div>
                  <div className="table-cell">{semente.CT}</div>
                  <div className="table-cell">{semente.CA}</div>
                  <div className="table-cell">{semente.CR}</div>
                  <div className="table-cell">{semente.RC}</div>
                </div>
              ))}
            </div>

            {isExpanded && (
              <>
                <li><strong>Vigor:</strong> {selectedResultado.vigor}</li>
                <li><strong>Uniformidade:</strong> {selectedResultado.uniformidade}</li>
                <li><strong>N.º de Plântulas:</strong> {selectedResultado.numero_plantulas}</li>
                <li><strong>N.º Sementes não Germinadas:</strong> {selectedResultado.semente_n_g}</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {popupOpen && (
        <PopupImagem
          imagem={selectedImage}
          hipocotilo={selectedHipocotilo}
          raiz={selectedRaiz}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default ProductDetails;
