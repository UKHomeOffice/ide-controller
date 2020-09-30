const http = require('http');
const response = require('./response.json');

const server = http.createServer((req, res) => {
  console.log(req.url)
  if (req.method === 'POST' && req.url === '/image/match') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  }
  res.statusCode = 404;
  res.end('Not found!')
});
server.listen(8081);