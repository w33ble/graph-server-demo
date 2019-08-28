const fs = require('fs');
const path = require('path');
const generate = require('nanoid/generate');

const MAX_ITEMS = 1000; // max entries in history
const TRUNCATE_AMOUNT = 200; // count of entries to remove when max is hit

class Data {
  constructor(filename = 'data.json', idField = 'id') {
    this.filePath = path.resolve('data', filename);
    this.idField = idField;
    try {
      const data = fs.readFileSync(this.filePath);
      this.db = data.length === 0 ? [] : JSON.parse(data);
    } catch (e) {
      this.db = [];
    }
  }

  persist() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.db), { encoding: 'utf8' });
  }

  get(id, getIndex = false) {
    if (!getIndex) {
      return this.db.find(doc => doc[this.idField] === id);
    }

    return this.db.findIndex(doc => doc[this.idField] === id);
  }

  getByField(field, val) {
    return this.db.find(doc => doc[field] === val);
  }

  getAllByField(field, val) {
    return this.db.filter(doc => doc[field] === val);
  }

  head(count) {
    return this.db.slice(0, count);
  }

  tail(count) {
    return this.db.slice(-count);
  }

  add(doc) {
    // prevent duplicate entries
    if (doc[this.idField] && this.get(doc[this.idField])) return doc[this.idField];

    // add doc to history
    const newIdx = this.db.push(
      doc[this.idField]
        ? doc
        : { ...doc, [this.idField]: generate('1234567890abcdefghijklmnopqrstuvwxyz', 10) }
    );

    // truncate as needed, removing first TRUNCATE_AMOUNT entries from the array
    if (this.db.length > MAX_ITEMS) this.db.splice(0, TRUNCATE_AMOUNT);

    // write the updated content to the file
    this.persist();

    return this.db[newIdx - 1];
  }

  remove(doc) {
    const idx = this.get(doc[this.idField], true);

    // removing document at matched index
    if (idx !== -1) {
      this.db.splice(idx, 1);

      // write the updated content to the file
      this.persist();
    }
  }
}

module.exports = Data;
