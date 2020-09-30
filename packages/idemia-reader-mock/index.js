const http = require('http');
const idemiaResponse = require('./image-match-response.json');

const idemiaServer = http.createServer((req, res) => {
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
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.url === '/reader/data') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    const refreshRate = 1000;
    return setInterval(() => {
      const id = Date.now();
      const data = `Hello World ${id}`;
      const message123 =
        `event: data\ndata: ${data}\n\n`;
      res.write(message123);
    }, refreshRate);
  }
  res.statusCode = 404;
  res.end('Not found!')
});
readerServer.listen(8080);