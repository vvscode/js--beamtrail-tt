const { Router } = require('express');
const phones = require('./phones');
const phone = require('./phone');

const router = Router();

router.get('/api/phones', phones);

router.use('/api/phone', phone);

module.exports = router;
