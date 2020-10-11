const http = require('http');
const idemiaResponse = require('./responses/image-match-response.json');
const readerResponse = require('./responses/reader-response');
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
idemiaServer.listen(8081);

const readerServer = http.createServer((req, res) => {
  allowAllOrigins(res);
  if (req.url === '/reader/data') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    readerServer.triggerScanEvents = () => {
      readerResponse.forEach(response => {
        const data = JSON.stringify(response);
        const message = `event: event\ndata: ${data}\n\n`;
        res.write(message);
        const message2 = `event: data\ndata: ${data}\n\n`;
        res.write(message2);
        const randomIndex = Math.round(Math.random());
        const status = ['OK', 'FAILED'];
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
readerServer.listen(8080);

module.exports = readerServer;
