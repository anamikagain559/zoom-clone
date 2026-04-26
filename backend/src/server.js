const http = require('http');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

const server = http.createServer(app);

// Database Connection
mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Strategy Matrix'))
    .catch(err => console.warn('MongoDB Unavailable. Falling back to Kinetic JSON Persistence.'));

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
        
        socket.to(roomId).emit('user-connected', userId, userName);

        socket.on('send-message', (message) => {
            io.to(roomId).emit('create-message', message, userName);
        });

        socket.on('disconnect', () => {
            console.log(`User ${userId} (${userName}) left room: ${roomId}`);
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });
});

const PORT = config.PORT;
server.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
