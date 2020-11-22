const Datastore = require('nedb')
const appInsights = require('applicationinsights');
appInsights.setup('64e048ce-66b2-4bf2-ad99-68e9263cb760').setUseDiskRetryCaching(true).start();

const client = appInsights.defaultClient;


const dbPath = '/Users/ali/Library/Application Support/IDE/ide-controller-log.db';
const db = {};
db.log = new Datastore({ filename: dbPath,  autoload: true });


db.log.loadDatabase(function (error) {
  if (error) console.error(err);
});


db.log.count({}, function (err, count) {
  console.log(count);
});

db.log.find({}).limit(100).exec(function (err, docs) {
  docs.forEach(entry => {
    client.trackEvent({name: 'Document Scan Event', properties: entry});
  })

  const bufferInterval = setInterval(() => {
    const isBufferEmpty = client.channel._buffer.length === 0;
    if (isBufferEmpty) {
      docs.forEach(entry => {
        db.log.remove({ _id: entry._id})
      })
      clearInterval(bufferInterval);
    }
  }, 5000);
});




