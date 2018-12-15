const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const api = require('./api');

const PORT = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json({ strict: false }));
    server.use(api);
    server.get('*', handle);
    server.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    });

    server.listen(PORT, err => {
      if (err) {
        throw err;
      }
      console.log(`Listen to the http://0.0.0.0:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
