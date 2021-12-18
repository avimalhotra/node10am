const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    //io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 
    // This will emit the event to all connected sockets
    socket.broadcast.emit('hi');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});