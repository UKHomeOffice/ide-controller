import React, { useState, useEffect } from 'react';
import './App.scss';
import { logger } from 'react-native-logs';
import Header from "./Components/Header";
import PhotoPanel from "./Components/PhotoPanel";

const log = logger.createLogger();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "mytest"
        };
        this.eventSource = new EventSource('http://localhost:8080/reader/data');
    }

    componentDidMount() {
        this.eventSource.onmessage = e => {
            log.info("New Event" + e.data);
            this.fullpageDocument(JSON.parse(e.data));
        }
    }

    fullpageDocument(data) {
        log.info("JSON : " + data.event);
    }
  // const [ documents, setDocument ] = useState([]);
  // const [ listening, setListening ] = useState(false);
  //
  // useEffect( () => {
  //   if (!listening) {
  //     const events = new EventSource('http://localhost:8080/reader/data');
  //     events.onmessage = (event) => {
  //       log.info('EventSource status', events.readyState);
  //       const parsedData = JSON.parse(event.data);
  //       log.info('Data type: ' + parsedData.dataType + " Data length " + parsedData.dataLength);
  //       setDocument((documents) => documents.concat(parsedData));
  //     };
  //
  //     setListening(true);
  //   }
  // }, [listening, documents]);

    render() {
      return (
          <React.StrictMode>
              <Header />
              <PhotoPanel value={this.state.data} />
          </React.StrictMode>
      );
    }

}

export default App;
