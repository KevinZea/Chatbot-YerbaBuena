import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { createChat } from './chat';
import LinkRenderer from './LinkRenderer/LinkRenderer';
import AddToHomeScreenButton from './AddToHomeScreenButton/AddToHomeScreenButton';
import space from './resources/portada.webp'

import icono from './resources/icono.webp'

function App() {
  const [chats, setChats] = useState([])
  const [prompt, setPrompt] = useState('')
  const chatContainerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [imageFixed, setImageFixed] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Retirar el controlador de eventos al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function promptHandle(e) {
    setPrompt(e.target.value)
  }
  async function sendMessages(e) {
    if (prompt.length >= 1) {
      let obj = {
        "role": "user",
        "content": prompt
      }
      setPrompt('')
      stateChats(obj)
      stateChats({ role: "assistant", content: "...Pensando..." })
      const response = await createChat(prompt)
      chats.pop()
      setChats([...chats])
      stateChats(response)
      // console.log(chats)
    }
  }
  function stateChats(obj) {
    chats.push(obj)
    setChats([...chats])
  }

  function Keydownhandle(e) {
    if (e.key === "Enter") {
      sendMessages(e)
    }
  }
  useEffect(() => {
    if (chatContainerRef.current) {
      scrollToBottom();
    }
  }, [chats]);
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const handleScroll = () => {
    // Verificar la posición de desplazamiento y aplicar la clase CSS según sea necesario
    if (window.scrollY > 10) {
      setImageFixed(true);
    } else {
      setImageFixed(false);
    }
  };


  const smallScreen = windowSize.width < 768
  const enlace = "https://elasesor.site/"
  return (
    <div className='app'>
      <nav className='navbar'>
        <h1>El Asesor</h1>
        <div className='navbar-menu'>
          <a href={enlace} target='_blank'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
            </svg>
          </a>
        </div>
      </nav>
      <div className='chat'>
        {chats.length < 1 ? (
          <div className='chat-baner'>
            <div className='chat-baner-publi'>
              <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={space} class="d-block w-100" alt="..." />
                  </div>
                </div>
              </div>
            </div>

            <div className='chat-baner-info'>
              <span>
                ¡Bienvenido a El Asesor!
              </span>
              <p>
                Tu asistente virtual.
                <br></br>
                <br></br>
                Aquí encontrarás recomendaciones e información comercial de la ciudad de Yerba Buena.
                <br></br>
                <br></br>
                Puedes iniciar una conversación o probar los siguientes ejemplos:
              </p>
              <div className='chat-baner-info-buttons'>

                <button onClick={(e) => { setPrompt("¿Que comer en Yerbabuena?") }}>
                  ¿Que comer en Yerbabuena?
                </button>
                <button onClick={(e) => { setPrompt("¿Donde puedo hacer senderismo?") }}>
                  ¿Donde puedo hacer senderismo?
                </button>
              </div>

            </div>

          </div>

        ) :

          <div className='chat-messages' ref={chatContainerRef}>
            {smallScreen && (
              <div></div>
              // <div className={imageFixed ? 'slider' : 'carrusel'}>
              //   <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
              //     <div class="carousel-inner">
              //       <div class="carousel-item active">
              //         <img src={banner} class="d-block w-100" alt="..." />
              //       </div>
              //       <div class="carousel-item">
              //         <img src={bannerDos} class="d-block w-100" alt="..." />
              //       </div>
              //       <div class="carousel-item">
              //         <img src={bannerTres} class="d-block w-100" alt="..." />
              //       </div>
              //     </div>
              //   </div>
              // </div>
            )}
            {
              chats.length >= 1 && (
                chats.map((c) => {
                  return (
                    c.role === "assistant" ? (
                      <div className='chat-asistent'>
                        <div className='chat-asistent-icon'>
                          <img src={icono}></img>
                        </div>
                        <span><LinkRenderer text={c.content} /></span>
                      </div>
                    ) :
                      <div className='chat-user'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                        </svg>
                        <span>{c.content}</span>
                      </div>
                  )
                })
              )
            }
          </div>
        }
        <div className='chat-input'>
          <input type='text'
            placeholder='Préguntale al Asesor...'
            onChange={(e) => { promptHandle(e) }}
            value={prompt}
            onKeyDown={(e) => { Keydownhandle(e) }}
          >
          </input>
          <button onClick={(e) => { sendMessages(e) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </button>
        </div>

      </div>
      <AddToHomeScreenButton />
    </div>

  );
}

export default App;
