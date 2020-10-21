// Global imports
import React, { useEffect, useState } from 'react';

// Local  imports
import { EventSourceProvider } from './Components/Context/EventSource';
import { LivePhotoProvider } from './Components/Context/LivePhoto';
import { ScoreProvider } from './Components/Context/Score';
import { StatusProvider } from './Components/Context/Status';
import Index from './Components/Pages';
import { DATA_READER, IMAGE_MATCH } from './config/api-endpoints';
import {
  END_OF_DOCUMENT_DATA,
  READER_STATUS,
  START_OF_DOCUMENT_DATA,
} from './config/EventSource';
import { initOnlineStatus } from './helpers/electron';
import { post, generateUUID } from './helpers/common';
import { sendToElectronStore, saveToDesktop } from './helpers/ipcMainEvents';
import './helpers/globalError';

initOnlineStatus();
const eventSourceData = {};

const App = () => {
  const [eventSourceContext, setEventSourceContext] = useState({});
  const [livePhotoContext, setLivePhotoContext] = useState({});
  const [scoreContext, setScoreContext] = useState({});
  const [statusContext, setStatusContext] = useState({});

  // Doc reader
  useEffect(() => {
    const events = new EventSource(DATA_READER);
    events.addEventListener('data', (e) => {
      const messageData = JSON.parse(e.data);
      saveToDesktop(messageData);
      const datatype = messageData.dataType;
      const datadata = {
        data: messageData.data,
        codelineData: messageData.codelineData,
        image: messageData.image,
      };
      sendToElectronStore(eventSourceData[datatype], datadata);
      eventSourceData[datatype] = datadata;
    });

    events.addEventListener('event', (e) => {
      const messageData = JSON.parse(e.data);
      saveToDesktop(messageData);
      if (messageData.event) {
        eventSourceData[messageData.event] = messageData;
      }
      sendToElectronStore(messageData.event, messageData);
      if (messageData.event === START_OF_DOCUMENT_DATA) {
        setEventSourceContext({
          timestamp: Date.now(),
          eventSourceEvent: START_OF_DOCUMENT_DATA,
        });
        sendToElectronStore('uuid', generateUUID());
      }

      if (messageData.event === END_OF_DOCUMENT_DATA) {
        setEventSourceContext({
          ...eventSourceData,
          eventSourceEvent: END_OF_DOCUMENT_DATA,
        });
      }

      if (messageData.event === READER_STATUS) {
        setEventSourceContext({
          ...eventSourceData,
          readerStatus: messageData,
        });
      }
    });

    events.addEventListener('status', (e) => {
      const messageData = JSON.parse(e.data);
      saveToDesktop(messageData);
      sendToElectronStore('deviceStatus', messageData);
      setStatusContext({
        ...messageData,
      });
    });
  }, []);

  useEffect(() => {
    const { CD_IMAGEPHOTO, CD_SCDG2_PHOTO } = eventSourceContext;
    const { image } = livePhotoContext;
    if (!CD_IMAGEPHOTO?.image || !image) return;

    post(IMAGE_MATCH, {
      chipImage: CD_SCDG2_PHOTO?.image,
      bioImage: CD_IMAGEPHOTO.image,
      liveImage: image.replace('data:image/jpeg;base64,', ''),
    })
      .then((res) => {
        sendToElectronStore('matchingScore', JSON.parse(res));
        setScoreContext(JSON.parse(res));
      })
      .catch(() =>
        setScoreContext({
          match: { score: 0 },
        })
      );
  }, [livePhotoContext?.image]);

  return (
    <EventSourceProvider
      value={{
        eventSourceContext,
        setEventSourceContext,
      }}
    >
      <LivePhotoProvider
        value={{
          livePhotoContext,
          setLivePhotoContext,
        }}
      >
        <ScoreProvider
          value={{
            scoreContext,
            setScoreContext,
          }}
        >
          <StatusProvider
            value={{
              statusContext,
              setStatusContext,
            }}
          >
            <Index />
          </StatusProvider>
        </ScoreProvider>
      </LivePhotoProvider>
    </EventSourceProvider>
  );
};

export default App;
