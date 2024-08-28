import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CanvasComponent = ({ imageSrc, hipocotilo, raiz, highlightedLine, onClick, rotationAngle }) => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;

    const handleImageLoad = () => {
      const maxDim = 400;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        const scale = Math.min(maxDim / width, maxDim / height);
        width *= scale;
        height *= scale;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Aplicar rotação
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotationAngle * Math.PI / 180);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);
      ctx.restore();

      const drawLines = (lines, color, highlightedIndex) => {
        lines.forEach((line, index) => {
          if (line !== null && line.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = index === highlightedIndex ? 4 : 2;
            ctx.moveTo(line[0][0], line[0][1]);
            for (let i = 1; i < line.length; i++) {
              ctx.lineTo(line[i][0], line[i][1]);
            }
            ctx.stroke();
          }
        });
      };

      drawLines(
        hipocotilo.map(line => line.map(([x, y]) => [x * (canvas.width / img.width), y * (canvas.height / img.height)])),
        'red',
        highlightedLine
      );
      drawLines(
        raiz.map(line => line.map(([x, y]) => [x * (canvas.width / img.width), y * (canvas.height / img.height)])),
        'yellow',
        highlightedLine
      );

      setIsLoading(false);
    };

    const handleImageError = () => {
      console.error('Failed to load image');
      setIsLoading(false);
    };

    img.onload = handleImageLoad;
    img.onerror = handleImageError;
  }, [imageSrc, hipocotilo, raiz, highlightedLine, rotationAngle]); // Adicionar rotationAngle às dependências

  return (
    <div style={{ position: 'relative' }} onClick={onClick}>
      {isLoading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Carregando...
        </div>
      )}
      <canvas ref={canvasRef} className='ImagemMarcada'></canvas>
    </div>
  );
};

CanvasComponent.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  hipocotilo: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  ).isRequired,
  raiz: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  ).isRequired,
  highlightedLine: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  rotationAngle: PropTypes.number.isRequired, // Adicione a prop rotationAngle
};

export default CanvasComponent;
