const http = require('http');
const idemiaResponse = require('./image-match-response.json');
const readerResponse = require('./reader-response');

const idemiaServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method === 'POST' && req.url === '/image/match') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(idemiaResponse));
  }
  res.statusCode = 404;
  res.end('Not found!')
});
idemiaServer.listen(8081);


const readerServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.url === '/reader/data') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    readerResponse.forEach(r => {
      const data = JSON.stringify(r);
      const message = `event: event\ndata: ${data}\n\n`;
      res.write(message);
      const message2 = `event: data\ndata: ${data}\n\n`;
      res.write(message2);
    });
  } else {
    res.statusCode = 404;
    res.end('Not found!')
  }
});
readerServer.listen(8080);