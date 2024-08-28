import React, { useRef, useEffect, useState } from 'react';

const CanvasComponent = ({ imageSrc, linha, linha2 }) => {

  let lines = linha.filter(function(elemento) {
    return elemento !== null;
});

let lines2 = linha2.filter(function(elemento) {
  return elemento !== null;
});

  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const maxDim = 1000;
      let width = img.width;
      let height = img.height;

      // Redimensionar a imagem apenas se necessário
      if (width > maxDim || height > maxDim) {
        const scale = Math.min(maxDim / width, maxDim / height);
        width *= scale;
        height *= scale;
      }

      // Redimensionar o canvas para corresponder às dimensões da imagem
      canvas.width = width;
      canvas.height = height;

      // Limpar o canvas antes de desenhar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar a imagem
      ctx.drawImage(img, 0, 0, width, height);

      // Função para desenhar as linhas
      const drawLines = (lines, color) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        lines.forEach(line => {
          if (line !== null && line.length > 1) {
            ctx.beginPath();
            ctx.moveTo(line[0][0], line[0][1]);
            for (let i = 1; i < line.length; i++) {
              ctx.lineTo(line[i][0], line[i][1]);
            }
            ctx.stroke();
          }
        });
      };

      // Desenhar as linhas após o carregamento da imagem
      drawLines(lines.map(line => line.map(([x, y]) => [x * (canvas.width / img.width), y * (canvas.height / img.height)])), 'red');
      drawLines(lines2.map(line => line.map(([x, y]) => [x * (canvas.width / img.width), y * (canvas.height / img.height)])), 'yellow');

      // Definir isLoading como false após o carregamento completo
      setIsLoading(false);
    };
  }, [imageSrc, lines, lines2]);

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Carregando...</div>}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasComponent;