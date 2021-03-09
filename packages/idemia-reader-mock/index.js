// Global imports
const http = require('http');

// Local imports
const idemiaResponse = require('./responses/image-match-response.json');
const withChip = require('./responses/with-chip');
const withoutChip = require('./responses/without-chip');
const withPACE = require('./responses/with-PACE');
const idCardFront = require('./responses/id-card-front');
const idCardBack = require('./responses/id-card-back');

const { allowAllOrigins } = require('./helpers');

const idemiaServer = http.createServer((req, res) => {
  allowAllOrigins(res);
  if (['POST', 'OPTIONS'].includes(req.method) && req.url === '/image/match') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(idemiaResponse));
  }
  res.statusCode = 404;
  res.end('Not found!')
});
idemiaServer.listen(1111);

const readerServer = http.createServer((req, res) => {
  const handleDocReaderResponse = response => {
    const data = JSON.stringify(response);
    if (response.event) {
      res.write(`event: event\ndata: ${data}\n\n`);
    } else if (response.data || response.data === null) {
      res.write(`event: data\ndata: ${data}\n\n`);
    } else if (response.status) {
      const statusMessage = JSON.stringify({ "status" : response.status});
      res.write(`event: status\ndata: ${statusMessage}\n\n`);
    }
  }

  allowAllOrigins(res);
  if (req.url === '/reader/data') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    readerServer.triggerWithChip = () => {
      withChip.forEach(handleDocReaderResponse);
    };

    readerServer.triggerWithPACE = () => {
      withPACE.forEach(handleDocReaderResponse);
    };

    readerServer.triggerWithoutChip = () => {
      withoutChip.forEach(handleDocReaderResponse);
    };

    readerServer.triggerWithIDFront = () => {
      idCardFront.forEach(handleDocReaderResponse);
    };

    readerServer.triggerWithIDBack = () => {
      idCardBack.forEach(handleDocReaderResponse);
    };

    readerServer.triggerWithChipSlow = () => {
      const delay = 400;
      withChip.forEach((response, i) => {
        const data = JSON.stringify(response);
        const message = `event: event\ndata: ${data}\n\n`;
        setTimeout(() => res.write(message), i * 1000 + delay);
        const message2 = `event: data\ndata: ${data}\n\n`;
        setTimeout(() => res.write(message2), i * 1000 + delay);
        const randomIndex = Math.round(Math.random());
        // const status = ['OK', 'FAILURE'];
        const status = ['OK', 'OK'];
        const statusMessage = JSON.stringify({ "status" : status[randomIndex]});
        res.write(`event: status\ndata: ${statusMessage}\n\n`);
      });
    };

  }

  else {
    res.statusCode = 404;
    res.end('Not found!')
  }
});
readerServer.listen(1110);

module.exports = readerServer;
