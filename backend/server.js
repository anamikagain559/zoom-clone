const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send({ status: 'Zoom Clone API is running' });
});

// Setup PeerJS server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
});
app.use('/peerjs', peerServer);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId, userName) => {
    console.log(`User ${userId} (${userName}) joined room: ${roomId}`);
    socket.join(roomId);
    
    // Broadcast to others in the room that a new user joined
    socket.to(roomId).emit('user-connected', userId, userName);

    // Chat functionality
    socket.on('send-message', (message) => {
      io.to(roomId).emit('create-message', message, userName);
    });

    socket.on('disconnect', () => {
      console.log(`User ${userId} (${userName}) left room: ${roomId}`);
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
