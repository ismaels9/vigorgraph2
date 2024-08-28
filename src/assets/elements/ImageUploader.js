import React, { useState } from 'react';
import ImagemUpload from '../Images/ImagemUpload.png';

function ImageUploader({ onSave, pegaPasta, setLoading, pasta }) {
  const [imagesData, setImagesData] = useState([]);

  const uploadImages = async (imageFiles) => {
    const formData = new FormData();
    for (const file of imageFiles) {
      formData.append('images', file);
    }
    if (pasta) {
      formData.append('folder', pasta);
    }
    try {
      const response = await fetch('https://square-frog-optimal.ngrok-free.app/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      const newImagesData = await Promise.all(
        Array.from(imageFiles).map(file => 
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const img = new Image();
              img.onload = () => {
                resolve({
                  url: event.target.result,
                  name: file.name,
                  width: img.width,
                  height: img.height,
                });
              };
              img.onerror = reject;
              img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
        )
      );

      setImagesData(newImagesData);
      onSave(newImagesData);

      const responseData = await response.json();
      console.log('Images uploaded:', responseData);
      pegaPasta(responseData.folder);
    } catch (error) {
      alert("Erro ao carrgar imagens. Verifique o Servidor");
      console.error('Error uploading images:', error.message);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setLoading(true);
    const files = e.dataTransfer.files;
    uploadImages(files);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    setLoading(true);
    uploadImages(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: '100%',
        minHeight: '200px',
        padding: '20px 0',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        marginTop: '20px',
        marginBottom: '20px',
        cursor: 'pointer',
      }}
    >
      <img src={ImagemUpload} alt="Upload" />
      <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
        Clique aqui ou arraste e solte as imagens
      </label>
      <input id="file-upload" type="file" onChange={handleFileInput} multiple style={{ display: 'none' }} />
    </div>
  );
}

export default ImageUploader;
