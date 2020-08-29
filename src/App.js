import React, { useState, useEffect } from 'react';
import { logger } from 'react-native-logs';

// Local  imports
import './App.scss';
import Footer from './Components/Footer';
import Header from "./Components/Header";
import PageBody from './Components/PageBody';
import DocumentData from './Types/DocumentData'

const log = logger.createLogger();

const colors = {
  blue: "#03619c",
  yellow: "#8c8f03",
  red: "#9c0312"
};
export const ColorContext = React.createContext(colors.blue);

const App = () => {
  const [ fullpage, setFullpage] = useState(new Map());
  const [ listening, setListening ] = useState(false);
  const FullpageContext = React.createContext(fullpage)

  // Doc reader
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

  return (
    <div>
      <Header />
      <ColorContext.Provider value={colors}>
      <FullpageContext.Provider value={ fullpage }>
        <PageBody />
      </FullpageContext.Provider>
      </ColorContext.Provider>
      <Footer />
    </div>
  );
}

export default App