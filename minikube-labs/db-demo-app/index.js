const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection with retry
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/yourDatabaseName';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed, retrying in 5s...', err.message);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Model
const Email = mongoose.model('Email', {
  email: String,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/add-email', async (req, res) => {
  try {
    const newEmail = new Email({ email: req.body.email });
    await newEmail.save();
    res.redirect('/');
  } catch {
    res.status(500).send('Error adding email');
  }
});

app.get('/emails', async (req, res) => {
  try {
    res.json(await Email.find({}));
  } catch {
    res.status(500).send('Error fetching emails');
  }
});

// ❌ REMOVE THIS IN KUBERNETES
// process.exit() causes CrashLoopBackOff
app.get('/exit', (req, res) => {
  res.send('Exit disabled in Kubernetes');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
