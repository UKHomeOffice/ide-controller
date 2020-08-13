import React, { useState, useEffect } from 'react';
import './App.scss';
import { logger } from 'react-native-logs';
import Header from "./Components/Header";
import PhotoPanel from "./Components/PhotoPanel";

const log = logger.createLogger();

function App() {
  const [ document, setDocument ] = useState([]);
  const [ listening, setListening ] = useState(false);

  //Doc reader
  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:8080/reader/data');
      events.onmessage = (event) => {
        log.info('EventSource status', events.readyState);
        const parsedData = JSON.parse(event.data);
        log.info('Data type: ' + parsedData.dataType + " Data length " + parsedData.dataLength);
        //setDocument((document) => document.concat(parsedData));
        setDocument(parsedData);
      };
      setListening(true);
    }
  }, [listening, document]);

  //Webcam
  useEffect( () => {

  })

    const commonProps = {event: 'richy', length: '1251'};
    //setDocument(commonProps);

  return (
      <React.StrictMode>
          <Header />
          {/*<PhotoPanel name={"Rich"} {...document}/>*/}
          <PhotoPanel {...commonProps}/>
          {/*<PhotoPanel {...document}/>*/}
      </React.StrictMode>
  );
}

export default App;
