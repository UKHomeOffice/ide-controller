// Global imports
import React, { useState, useEffect } from 'react';

// Local  imports
import Index from './Components/Pages';
import { Provider } from './Components/Context';
import { initOnlineStatus } from './helpers/electron';
import { post } from './helpers/common';
import { DATA_READER, IMAGE_MATCH } from './config/api-endpoints';

initOnlineStatus();
const eventSourceData = {};

const App = () => {
  const [context, setContext] = useState({ eventSourceData });

  // Doc reader
  useEffect(() => {
    const events = new EventSource(DATA_READER);
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
        setContext({ ...context, eventSourceData });
      }

      if (messageData.event === 'READER_STATUS') {
        setContext({ ...context, readerStatus: messageData });
      }
    });
  }, [context]);

  useEffect(() => {
    const { eventSourceData: evenDdata, image } = context;
    if (!evenDdata?.CD_IMAGEPHOTO?.image || !image) return;
    post(IMAGE_MATCH, {
      chipImage: evenDdata.CD_SCDG2_PHOTO?.image,
      bioImage: evenDdata.CD_IMAGEPHOTO.image,
      liveImage: image.replace('data:image/jpeg;base64,', ''),
    })
      .then((res) => {
        setContext({
          ...context,
          match: JSON.parse(res),
        });
      })
      .catch(() =>
        setContext({
          ...context,
          match: { score: 0 },
        })
      );
  }, [context.image, context.eventSourceData]);

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
