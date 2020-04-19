const express = require('express');
const path = require('path');
// const proxy = require('express-http-proxy');

const app = express();

// Init Middleware
app.use(express.json());

app.use('/api/backend', require('./server-backend'));

// //
// // Using my own module, not using proxy
// //
// app.use('/proxy', proxy('http://js-assessment-backend.herokuapp.com', {
//   proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
//     // you can update headers
//     proxyReqOpts.headers['Content-Type'] = 'application/json';
//     return proxyReqOpts;
//   }
// }));


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
