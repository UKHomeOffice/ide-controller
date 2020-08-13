import React, { useState, useEffect } from 'react';
import './App.scss';
import { logger } from 'react-native-logs';
import Header from "./Components/Header";
import PhotoPanel from "./Components/PhotoPanel";
import DocumentData from "./Types/DocumentData"

const log = logger.createLogger();

function App() {
  const datamap = new Map();
  const [ document, setDocument ] = useState();
  const [ listening, setListening ] = useState(false);
 
  //Doc reader
  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:8080/reader/data');

      events.addEventListener("data", e => {
        const messageData = JSON.parse(e.data);
        let datatype = messageData.dataType;
        let datadata = new DocumentData(messageData.data, messageData.codelineData, messageData.image);
        datamap.set(datatype, datadata);
        });

      events.addEventListener("event", e => {
        const messageData = JSON.parse(e.data);
        log.info("EVENT " + messageData.dataType + " Event " + messageData.event);
        if(messageData.event === "START_OF_DOCUMENT_DATA") {
          log.info("START OF DOCUMENT")
          datamap.clear();
          setDocument([]);
        }
        if(messageData.event === "END_OF_DOCUMENT_DATA") {
          log.info("END OF DOCUMENT");
          setListening(false);
          setDocument(datamap);
        }
        });

      setListening(true);
    }
  }, [listening, document]);

  //Webcam
  useEffect( () => {

  })

  return (
      <React.StrictMode>
          <Header />
          <PhotoPanel data={document}/>
          {/* <PhotoPanel {...commonProps}/> */}
          {/*<PhotoPanel {...document}/>*/}
      </React.StrictMode>
  );
}

export default App;
