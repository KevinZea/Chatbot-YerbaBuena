import React, { useState, useEffect } from 'react';
import './AddToHomeScreenButton.css';

const AddToHomeScreenButton = () => {
  const [prompt, setPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      setPrompt(event);
      setShowPopup(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleClick = () => {
    if (!prompt) return;
    prompt.prompt();
    prompt.userChoice.then((result) => {
      if (result.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setPrompt(null);
      setShowPopup(false);
    });
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="popup">
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          <div className='popup-text'>
            <p>Agrega a tu Asesor
              a tu pantalla de inicio.
            </p>
          </div>
          <button className="add-button" onClick={handleClick}>
            Agregar
          </button>
        </div>
      )}
    </>
  );
};

export default AddToHomeScreenButton