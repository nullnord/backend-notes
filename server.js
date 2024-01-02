const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const helmet = require('helmet');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Apply Helmet to secure your Express app by setting various HTTP headers
app.use(helmet());

// Apply body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Apply rate limiting middleware to all requests
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', apiLimiter); // Apply rate limiting to API routes only

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas...'))
    .catch(err => console.error('Could not connect to MongoDB Atlas:', err));



// GET /
app.get('/', (req, res) => {
    res.send('Notes API!');
});

// API routes 
const authRoutes = require('./api/v1/routes/authRoutes');
const noteRoutes = require('./api/v1/routes/noteRoutes');

// Apply rate limiting to API routes only
app.use('/api/', apiLimiter);

// Apply authentication routes with prefix '/api/auth'
app.use('/api/auth', authRoutes);

// Apply note-related routes with prefix '/api/notes'
app.use('/api/notes', noteRoutes);

// Apply search route with prefix '/api/search'
app.use('/api/search', noteRoutes);

////////////////////////////////////////////////

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! :(');
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
