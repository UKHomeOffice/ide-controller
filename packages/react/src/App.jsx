// Global imports
import React, { useState, useEffect } from 'react';

// Local  imports
import Header from './Components/Header';
import PageBody from './Components/PageBody';
import DocumentData from './Types/DocumentData';
import { ImageProvider } from './Components/ImageContext';

const App = () => {
  const [fullpage, setFullpage] = useState(new Map());
  const [listening, setListening] = useState(false);

  // Doc reader
  useEffect(() => {
    if (!listening) {
      const events = new EventSource('http://localhost:8080/reader/data');

      events.addEventListener('data', (e) => {
        const messageData = JSON.parse(e.data);
        const datatype = messageData.dataType;
        const datadata = new DocumentData(
          messageData.data,
          messageData.codelineData,
          messageData.image
        );
        fullpage.set(datatype, datadata);
      });

      events.addEventListener('event', (e) => {
        const messageData = JSON.parse(e.data);
        if (messageData.event === 'START_OF_DOCUMENT_DATA') {
          setFullpage(fullpage.clear());
        }

        if (messageData.event === 'END_OF_DOCUMENT_DATA') {
          setFullpage(fullpage);
        }
      });

      setListening(true);
    }
  }, [listening, fullpage]);

  return (
    <div>
      <Header />
      <ImageProvider value={fullpage}>
        <PageBody />
      </ImageProvider>
    </div>
  );
};

export default App;
