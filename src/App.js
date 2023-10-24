import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { createChat } from './chat';
import LinkRenderer from './LinkRenderer/LinkRenderer';
import AddToHomeScreenButton from './AddToHomeScreenButton/AddToHomeScreenButton';
// import logo from './resources/logo.png'
import space from './resources/portada.webp'
import banner from './resources/banner1.webp'
import bannerDos from './resources/banner2.webp'
import bannerTres from './resources/banner3.webp'

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
    console.log(window.scrollY)
    // Verificar la posición de desplazamiento y aplicar la clase CSS según sea necesario
    if (window.scrollY > 10) {
      setImageFixed(true);
      console.log("se cumple")
    } else {
      setImageFixed(false);
    }
  };


  const smallScreen = windowSize.width < 768

  return (
    <div className='app'>
      <nav className='navbar'>
        <h1>El Asesor</h1>
        <div className='navbar-menu'>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </div>
      </nav>
      <div className='chat'>
        {chats.length < 1 ? (
          <div className='chat-baner'>
            {/* <div className='chat-baner-icon'>
              <img src={logo} width={30} height={30}></img>

            </div> */}

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
              <div className={imageFixed ? 'slider' : 'carrusel'}>
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img src={banner} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                      <img src={bannerDos} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                      <img src={bannerTres} class="d-block w-100" alt="..." />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {
              chats.length >= 1 && (
                chats.map((c) => {
                  return (
                    c.role === "assistant" ? (
                      <div className='chat-asistent'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
                          <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                          <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                        </svg>
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
