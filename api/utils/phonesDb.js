const phones = require('./phonesDb.json');

const writeFile = require('util').promisify(require('fs').writeFile);

class PhonesDb {
  getListOfPhones() {
    return Promise.resolve(
      Object.keys(phones).map(key => ({
        name: key,
        phoneInfo: phones[key].phoneInfo || {},
        isAvailable: this.isPhoneAvailable(key),
        wasBookedAt: (phones[key].bookingInfo || {}).at,
        wasBookedBy: (phones[key].bookingInfo || {}).by,
      })),
    );
  }

  dumpDb() {
    return writeFile('./phonesDb.json', JSON.stringify(phones, null, 2));
  }

  isPhoneAvailable(phone) {
    return !phones[phone].bookingInfo;
  }

  bookPhone(phone, name) {
    if (!`${name}`.trim()) {
      return Promise.reject(new Error('Name is required'));
    }
    if (!(phone in phones)) {
      return Promise.reject(new Error('Phone not recognized'));
    }
    if (!this.isPhoneAvailable(phone)) {
      return Promise.reject(new Error('Phone is booked'));
    }
    phones[phone].bookingInfo = {
      at: new Date().toString(),
      by: name,
      key: Math.random(),
    };
    this.dumpDb().then(() => phones[phone].bookingInfo);
  }

  returnPhone(phone, key) {
    if (!(phone in phones)) {
      return Promise.reject(new Error('Phone not recognized'));
    }
    if (this.isPhoneAvailable(phone)) {
      return Promise.reject(
        new Error("Phone is avalable. You can't return it"),
      );
    }
    if (key !== phones[phone].bookingInfo.key) {
      return Promise.reject(
        new Error("You can't return phone with incorrect key"),
      );
    }
    delete phones[phone].bookingInfo;
    return this.dumpDb();
  }
}

module.exports = new PhonesDb();
