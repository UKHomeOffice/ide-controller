import React, { useState, useEffect } from 'react';
import './App.scss';
import { logger } from 'react-native-logs';
import Header from "./Components/Header";
import Footer from './Components/Footer';
import DocumentData from "./Types/DocumentData"
import PhotoPanel from "./Components/PhotoPanel";
import PageBody from './Components/PageBody';

const log = logger.createLogger();

export default function App() {
  const [ fullpage, setFullpage] = useState(new Map());
  const [ listening, setListening ] = useState(false);
 
  //Doc reader
  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:8080/reader/data');

      events.addEventListener("data", e => {
        const messageData = JSON.parse(e.data);
        let datatype = messageData.dataType;
        let datadata = new DocumentData(messageData.data, messageData.codelineData, messageData.image);
        fullpage.set(datatype, datadata);
        });

      events.addEventListener("event", e => {
        const messageData = JSON.parse(e.data);
        log.info("EVENT " + messageData.dataType + " Event " + messageData.event);
        if(messageData.event === "START_OF_DOCUMENT_DATA") {
          log.info("START OF DOCUMENT")
          setFullpage(fullpage.clear());
        }

        if(messageData.event === "END_OF_DOCUMENT_DATA") {
          log.info("END OF DOCUMENT");
          setFullpage(fullpage);
        }
        });

      setListening(true);
    }
  }, [listening, fullpage]);

  //Webcam
  useEffect( () => {

  })

  return (
      <React.StrictMode>
          <Header />
          <PageBody />
          <Footer />
      </React.StrictMode>
  );
}

{/* <PhotoPanel data={fullpage}/> */}

