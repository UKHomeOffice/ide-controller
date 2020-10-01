// Global imports
import React, { useState, useEffect } from 'react';

// Local  imports
import DocumentData from './Types/DocumentData';
import PageBody from './Components/PageBody';
import { StoreProvider } from './Components/StoreContext';
import { initOnlineStatus } from './helpers/electron';

initOnlineStatus();

const App = () => {
  const [store, setStore] = useState(new Map());
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
        store.set(datatype, datadata);
      });

      events.addEventListener('event', (e) => {
        const messageData = JSON.parse(e.data);
        if (messageData.event === 'START_OF_DOCUMENT_DATA') {
          setStore(new Map());
        }

        if (messageData.event === 'END_OF_DOCUMENT_DATA') {
          setStore(store);
        }
      });

      setListening(true);
    }
  }, [listening, store]);

  return (
    <StoreProvider value={store}>
      <PageBody />
    </StoreProvider>
  );
};

export default App;
