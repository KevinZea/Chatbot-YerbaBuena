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
          <div className='popup-text'>
            <p>Agrega a el Asesor
              a tu pantalla de inicio.
            </p>
          </div>
          <div className='btns'>
            <button className="add-button" onClick={handleClick}>
              Agregar
            </button>
            <button className="close-button" onClick={handleClose}>
              Más Tarde
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default AddToHomeScreenButton