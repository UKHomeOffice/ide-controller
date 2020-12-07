const Datastore = require('nedb');

class DB extends Datastore {
  constructor(dbFullPath) {
    super({ filename: dbFullPath });
    this.loadDatabase();
  }
}

module.exports = DB;
