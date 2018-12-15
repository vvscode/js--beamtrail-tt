const phonesDb = require('./utils/phonesDb');
module.exports = (req, res) =>
  phonesDb.getListOfPhones().then(data => res.json(data));
