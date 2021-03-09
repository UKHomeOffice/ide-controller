// Global imports
import React, { useEffect, useState } from 'react';

// Local  imports
import { EventSourceProvider } from './Components/Context/EventSource';
import { LivePhotoProvider } from './Components/Context/LivePhoto';
import { ScoreProvider } from './Components/Context/Score';
import { StatusProvider } from './Components/Context/Status';
import Index from './Components/Pages';
import { DATA_READER, IMAGE_MATCH } from './config/api-endpoints';
import { sendCameraDevices, sendGeolocation } from './helpers/ipcMainEvents';
import {
  END_OF_DOCUMENT_DATA,
  READER_STATUS,
  START_OF_DOCUMENT_DATA,
  IDENTITY_CARD,
} from './config/EventSource';
import { initOnlineStatus } from './helpers/electron';
import { post, generateUUID } from './helpers/common';
import logData, { logDataEvent } from './helpers/log';
import './helpers/globalError';

initOnlineStatus();

const App = () => {
  const [eventSourceContext, setEventSourceContext] = useState({});
  const [livePhotoContext, setLivePhotoContext] = useState({});
  const [scoreContext, setScoreContext] = useState({});
  const [statusContext, setStatusContext] = useState();
  const [uuid, setUuid] = useState('');

  let docType = '';

  // On Startup
  useEffect(() => {
    sendCameraDevices();
    sendGeolocation();
  }, []);

  // Doc reader
  useEffect(() => {
    let eventSourceData = {};
    const events = new EventSource(DATA_READER);
    events.addEventListener('data', (e) => {
      const messageData = JSON.parse(e.data);
      const datatype = messageData.dataType;
      const datadata = {
        data: messageData.data,
        codelineData: messageData.codelineData,
        image: messageData.image,
      };
      logDataEvent(messageData.dataType, messageData);
      eventSourceData[datatype] = datadata;

      if (messageData.codelineData?.DocType) {
        docType = messageData.codelineData.DocType;
      }
    });

    events.addEventListener('event', (e) => {
      const messageData = JSON.parse(e.data);
      if (messageData.event) {
        eventSourceData[messageData.event] = messageData;
      }
      if (
        messageData.event === START_OF_DOCUMENT_DATA &&
        docType !== IDENTITY_CARD
      ) {
        setLivePhotoContext({});
        setEventSourceContext({
          timestamp: Date.now(),
          eventSourceEvent: START_OF_DOCUMENT_DATA,
        });
        const generatedUUID = generateUUID();
        setUuid(generatedUUID);
        logDataEvent('uuid', generatedUUID);
      }
      logDataEvent(messageData.dataType, messageData);

      if (docType === IDENTITY_CARD) {
        setEventSourceContext({
          ...eventSourceData,
        });
      } else if (messageData.event === END_OF_DOCUMENT_DATA) {
        setEventSourceContext({
          ...eventSourceData,
          eventSourceEvent: END_OF_DOCUMENT_DATA,
        });
        eventSourceData = {};
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
      logDataEvent('deviceStatus', messageData);
      setStatusContext(messageData.status);
    });
  }, []);

  const {
    CD_IMAGEPHOTO,
    croppedDocumentImage,
    CD_SCDG2_PHOTO,
  } = eventSourceContext;
  const { image } = livePhotoContext;
  useEffect(() => {
    if (!CD_IMAGEPHOTO?.image || !image) return;

    post(IMAGE_MATCH, {
      chipImage: CD_SCDG2_PHOTO?.image,
      bioImage: croppedDocumentImage.replace('data:image/jpeg;base64,', ''),
      liveImage: image.replace('data:image/jpeg;base64,', ''),
      uuid,
      mrzHash: logData().mrzHash,
    })
      .then((res) => {
        logDataEvent('matchingScore', JSON.parse(res));
        setScoreContext(JSON.parse(res));
      })
      .catch(() =>
        setScoreContext({
          match: { score: 0 },
        })
      );
  }, [image, croppedDocumentImage, CD_SCDG2_PHOTO]);

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
