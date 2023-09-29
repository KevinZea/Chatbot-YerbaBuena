import React from 'react';
import './LinkRenderer.css'

const LinkRenderer = ({ text }) => {
  const renderTextWithLinks = () => {
    const regex = /(?:https?|ftp):\/\/[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?(?:\.|\b)|www\.[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?(?:\.|\b)/gi;
    let arrayText = []
    const parts = text.split('\n');
      for (let parte of parts){
          parte = parte + '\n'
          let aux = parte.split(' ')
          for (let a of aux){
            if (a.match(regex) && a[a.length-1] === '.') {
              a = a.slice(0, -1)
            }
            arrayText.push(a)
          }
      }

    return arrayText.map((part, index) => {
      if (part.match(regex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className='enlaces'>
            Click {"\n"}
          </a>
        );
      } else {
        return <React.Fragment key={index}>{part + " "}</React.Fragment>;
      }
    });
  };

  return <div>{renderTextWithLinks()}</div>;
};

export default LinkRenderer;
