const app = require('../app');
const http = require('http');
require('./connectDb');

const server = http.createServer(app);

const port = 3000;

server.listen(port);

server.on('error', (error) => console.log(error));

server.on('listening', () => console.log('Listening on',port));

