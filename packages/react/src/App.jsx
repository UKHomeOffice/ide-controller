// Global imports
import React, { useState, useEffect } from 'react';

// Local  imports
import PageBody from './Components/Molecules/PageBody';
import { Provider } from './Components/Context';
import { initOnlineStatus } from './helpers/electron';

initOnlineStatus();
const eventSourceData = {};

const App = () => {
  const [context, setContext] = useState(eventSourceData);

  // Doc reader
  useEffect(() => {
    const events = new EventSource('http://localhost:8080/reader/data');
    events.addEventListener('data', (e) => {
      const messageData = JSON.parse(e.data);
      const datatype = messageData.dataType;
      const datadata = {
        data: messageData.data,
        codelineData: messageData.codelineData,
        image: messageData.image,
      };
      eventSourceData[datatype] = datadata;
    });

    events.addEventListener('event', (e) => {
      const messageData = JSON.parse(e.data);
      if (messageData.event === 'START_OF_DOCUMENT_DATA') {
        setContext({});
      }

      if (messageData.event === 'END_OF_DOCUMENT_DATA') {
        setContext({ ...eventSourceData });
      }
    });
  }, [context]);

  return (
    <Provider
      value={{
        context,
        setContext,
      }}
    >
      <PageBody />
    </Provider>
  );
};

export default App;
