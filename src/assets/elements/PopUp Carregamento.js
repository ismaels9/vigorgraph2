import React from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from '../elements/lotties/animação.json' // Importe sua animação Lottie

const LoadingPopup = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return (
        <div className="loading-popup">
            <div className="loading-popup-inner">
                <Lottie options={defaultOptions} height={120} width={120} />
                <p>Carregando...</p>
            </div>
        </div>
    )
};

export default LoadingPopup;
