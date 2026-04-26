require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const jsonDb = require('./utils/jsonDb');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database Connection
let isMongoConnected = false;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Strategy Matrix');
    isMongoConnected = true;
  })
  .catch(err => {
    console.warn('MongoDB Unavailable. Falling back to Kinetic JSON Persistence.');
    isMongoConnected = false;
  });

// --- Auth Routes ---

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (isMongoConnected) {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'Identity already registry' });

      user = new User({ name, email, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } else {
      // Fallback to JSON DB
      const existingUser = jsonDb.findUserByEmail(email);
      if (existingUser) return res.status(400).json({ message: 'Identity already registry' });

      const newUser = await jsonDb.saveUser({ name, email, password });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    }
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'System Error', error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (isMongoConnected) {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } else {
      // Fallback to JSON DB
      const user = jsonDb.findUserByEmail(email);
      if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

      const isMatch = await jsonDb.comparePassword(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'System Error', error: err.message });
  }
});

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

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
