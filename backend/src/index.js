const express = require('express');
const http = require('http');
const port = 80;
const socket = require('socket.io');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(routes);

const server = http.createServer(app);

const io = socket(server);

console.log(`Server is running in port: ${String(port)}`)
server.listen(port);

module.exports = io;
require('./connection/socketIO/events');