import React, { useState, useEffect } from 'react';
import './App.css';
import { logger } from 'react-native-logs';
 
var log = logger.createLogger();

function App() {
  const [ documents, setDocument ] = useState([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:8080/reader/data');
      events.onmessage = (event) => {
        log.info('EventSource status', events.readyState);
        const parsedData = JSON.parse(event.data);
        log.info('Data type: ' + parsedData.dataType + " Data length " + parsedData.dataLength);
        setDocument((documents) => documents.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, documents]);

  return (
      <table className="stats-table">
        <thead>
        <tr>
          <th>Data type</th>
          <th>Data length</th>
          <th>Code</th>
        </tr>
        </thead>
        <tbody>
        {
          documents.map((document, i) =>
              <tr key={i}>
                <td>{document.dataType}</td>
                <td>{document.dataLength}</td>
                <td>{}</td>
              </tr>
          )
        }
        </tbody>
      </table>
  );
}

export default App;
