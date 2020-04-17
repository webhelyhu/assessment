const express = require('express');
const proxy = require('express-http-proxy');
const connectDB = require('./config/db');
const path = require('path');

const axios = require('axios');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/backend', require('./routes/api/backend'));
app.use('/proxy', proxy('http://js-assessment-backend.herokuapp.com', {
  proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
    // you can update headers
    proxyReqOpts.headers['Content-Type'] = 'application/json';
    return proxyReqOpts;
  }
}));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
