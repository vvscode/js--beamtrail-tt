const fonoapi = require('fonoapi-nodejs');

const dbPath = '../api/utils/phonesDb.json';

const phonesDb = require(dbPath);

fonoapi.token = process.env.FONOAPI_TOKEN;

const getPhoneDetails = phone =>
  new Promise((resolve, reject) =>
    fonoapi.getDevices(
      (query, data) => (data.status === 'error' ? reject(data) : resolve(data)),
      phone,
    ),
  );

const phonesToFetch = Object.keys(phonesDb).filter(
  key => !phonesDb[key].phoneInfo,
);

console.log(`
We're going update phone details from fonoApi for [${phonesToFetch.join(
  ', ',
)}] phones
Only phones with no \`phoneInfo\` will be processed
Db path: ${dbPath}
`);

Promise.all(
  phonesToFetch.map(async phone => {
    try {
      let [info] = await getPhoneDetails(phone);
      phonesDb[phone].phoneInfo = {
        technology: info.technology,
        '2gBands': info._2g_bands,
        '3gBands': info._3g_bands,
        '4gBands': info._4g_bands,
      };
    } catch (err) {
      console.log(`Error on fetching info for: "${phone}"`, err);
    }
  }),
)
  .then(() => {
    require('fs').writeFileSync(dbPath, JSON.stringify(phonesDb, null, 2));
  })
  .then(() =>
    console.log(
      `phones info updated based on fonoApi for [${phonesToFetch.join(',')}])`,
    ),
  )
  .catch(console.error);
