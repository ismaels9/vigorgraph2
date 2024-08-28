import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import ImageUploader from '../assets/elements/ImageUploader';
import MenuLateral from '../assets/elements/menuLateralDash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize, faTimes } from "@fortawesome/free-solid-svg-icons";
import Menu from '../assets/elements/menu';
import LoadingImages from "../assets/elements/PopUp Carregamento copy";


function Dashboard_Analise() {
  const usuarioAutenticado = JSON.parse(localStorage.getItem('usuario'));
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [imagens, setImagens] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [especie, setEspecie] = useState('feijao'); // Estado para o dropdown
  const [lote, setLote] = useState(''); // Estado para o input de texto
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro
  const [pasta, setPasta] = useState('');
  const [altura, setAltura] = useState();
  const [loading, setLoading] = useState(false);

  const [largura, setLargura] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioAutenticado) {
      setRedirectToHome(true);
    }
  }, [usuarioAutenticado]);

  if (redirectToHome) {
    return <Navigate to="/" replace />;
  }

  const onSave = (images) => {
    setImagens((prev) => [...prev, ...images]);
    setLoading(false); // Terminar o carregamento
  };

  const pegaPasta = (caminho) => {
    setPasta(caminho);
  };
  

  const removeImage = async (index) => {
    const imageToRemove = imagens[index];
    const response = await fetch('https://square-frog-optimal.ngrok-free.app/delete_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_name: imageToRemove.name,
        folder: pasta,
      }),
    });

    if (response.ok) {
      const newImagens = [...imagens];
      newImagens.splice(index, 1);
      setImagens(newImagens);
    } else {
      const result = await response.json();
      setErrorMessage(`Erro ao excluir a imagem: ${result.error}`);
    }
  }

  const handleOpenPopup = (image) => {
    setSelectedImage(image);
    setPopupOpen(true);
  }

  const handleClosePopup = () => {
    setSelectedImage(null);
    setPopupOpen(false);
  }

  const handleAnalyzeImages = () => {
    // Verificar se a altura e largura são números
    const alturaNumber = parseFloat(altura);
    const larguraNumber = parseFloat(largura);

    if (!especie || !lote || isNaN(alturaNumber) || isNaN(larguraNumber)) {
      setErrorMessage('Por favor, preencha todos os campos com valores numéricos válidos.');
    } else {
      setErrorMessage('');
      const ppi = [];
      imagens.forEach(imagem =>{
        const raizImg = Math.sqrt(Math.pow(larguraNumber, 2) + Math.pow(alturaNumber, 2));
        const raizpixel = Math.sqrt(Math.pow(imagem.width, 2) + Math.pow(imagem.height, 2));
        ppi.push(raizpixel/raizImg);
      })
      navigate('/dashboard-resultado', { state: { lote, especie, imagens, pasta, ppi } });
    }
  }



  return (
    <div>
      <Menu />
      <div className='DashBoardAnalista'>
        <MenuLateral />
        <div className='DadosDashboard'>
          <div className='Coluna'>
            <p className='TextoPrincipal'>Adicionar imagens</p>
            <ImageUploader onSave={onSave} pegaPasta={pegaPasta} setLoading={setLoading} pasta={pasta} />
            <div className="grupo">
              <input
                type="number"
                placeholder="Altura da Imagem (em mm)"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className="lote"
              />
              <input
                type="number"
                placeholder="Largura da Imagem (em mm)"
                value={largura}
                onChange={(e) => setLargura(e.target.value)}
                className="lote"
              />
            </div>
          </div>
          <div className='Coluna'>
            <p className='TextoPrincipal'>Imagens adicionadas ({imagens.length})</p>
            <div className='ImagensCarregadas'>
              {loading ? (
                <LoadingImages></LoadingImages>
              ) : (
                imagens.map((image, index) => (
                  <div key={index} style={{ width: '100%' }}>
                    <p className="lista">{index + 1} - {image.name} <div><FontAwesomeIcon icon={faMaximize} onClick={() => handleOpenPopup(image)} /> <FontAwesomeIcon icon={faTimes} color="red" onClick={() => removeImage(index)} /></div> </p>
                  </div>
                ))
              )}
            </div>
            <div className="grupo">
              <select value={especie} onChange={(e) => setEspecie(e.target.value)} className="Dropdown-select">
                <option value="feijao">Feijão</option>
                <option value="soja">Soja</option>
                <option value="algodao">Algodão</option>
              </select>
              <input
                type="text"
                placeholder="Lote"
                value={lote}
                onChange={(e) => setLote(e.target.value)}
                className="lote"
              />
            </div>
            <button
              className='MandarImagens'
              onClick={handleAnalyzeImages}
              disabled={imagens.length === 0}
            >
              Analisar Imagens
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
        {popupOpen && (
          <div className="popup">
            <div className="popup-content">
              <img src={selectedImage.url} alt="Imagem" />
              <button className="close-button" onClick={handleClosePopup}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default Dashboard_Analise;
