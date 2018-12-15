const express = require('express');
const next = require('next');

const api = require('./api');

const PORT = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(api);
    server.get('*', handle);

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
