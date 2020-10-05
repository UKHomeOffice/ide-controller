// Global imports
import React, { useState, useEffect } from 'react';

// Local  imports
import Index from './Components/Pages';
import { Provider } from './Components/Context';
import { initOnlineStatus } from './helpers/electron';
import { post } from './helpers/common';

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

    if (context.image) {
      post('http://localhost:8081/image/match', {
        image: context.image,
        image2: context.image,
      }).then((res) => {
        setContext({
          match: res,
          ...context,
        });
      });
    }
  }, [context]);

  return (
    <Provider
      value={{
        context,
        setContext,
      }}
    >
      <Index />
    </Provider>
  );
};

export default App;
