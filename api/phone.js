const { Router } = require('express');
const router = Router();
const phonesDb = require('./utils/phonesDb');

router.post('/book', (req, res) => {
  const { phone, name } = req.body;
  phonesDb
    .bookPhone(phone, name)
    .then(bookingInfo => res.json(bookingInfo))
    .catch(err => {
      res.status(400);
      res.send({
        message: err.message,
      });
    });
});

router.post('/return', (req, res) => {
  const { phone, key } = req.body;
  phonesDb
    .returnPhone(phone, key)
    .then(bookingInfo => res.json(bookingInfo))
    .catch(err => {
      res.status(400);
      res.send({
        message: err.message,
      });
    });
});

module.exports = router;
