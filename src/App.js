import React, { useState, useEffect } from 'react';
import './App.scss';
import { logger } from 'react-native-logs';
import Header from "./Components/Header";
import PhotoPanel from "./Components/PhotoPanel";

const log = logger.createLogger();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.eventSource = new EventSource('http://localhost:8080/reader/data');
    }

    componentDidMount() {
        this.eventSource.onmessage = e => {
            this.fullpageDocument(JSON.parse(e.data));
        }
    }

    fullpageDocument(data) {
        this.state.event = data.event;
        log.info("Event : " + this.state.event);
        this.state.dataType = data.dataType;
        log.info("DataType : " + this.state.dataType);
        this.state.dataLength = data.dataLength;
        log.info("Data Length : " + this.state.dataLength)
    }

    render() {
      return (
          <React.StrictMode>
              <Header />
              <PhotoPanel state={this.state}/>
          </React.StrictMode>
      );
    }

}

export default App;
