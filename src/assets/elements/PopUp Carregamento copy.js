import React from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from '../elements/lotties/Animation - 1719322720768.json' // Importe sua animação Lottie

const LoadingImages = () => {
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
                <Lottie options={defaultOptions} height={150} />
            </div>
        </div>
    )
};

export default LoadingImages;
