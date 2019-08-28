const fs = require('fs');
const path = require('path');
const generate = require('nanoid/generate');

const MAX_ITEMS = 1000; // max entries in history
const TRUNCATE_AMOUNT = 200; // count of entries to remove when max is hit

class Data {
  constructor(filename = 'data.json') {
    this.filePath = path.resolve('data', filename);
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

  get(id, index = false) {
    if (!index) {
      return this.db.find(doc => doc.id === id);
    }

    return this.db.findIndex(doc => doc.id === id);
  }

  add(doc) {
    // prevent duplicate entries
    if (doc.id && this.get(doc.id)) return;

    // add doc to history
    this.db.push(
      doc.id ? doc : { ...doc, id: generate('1234567890abcdefghijklmnopqrstuvwxyz', 10) }
    );

    // truncate as needed, removing first TRUNCATE_AMOUNT entries from the array
    if (this.db.length > MAX_ITEMS) this.db.splice(0, TRUNCATE_AMOUNT);

    // write the updated content to the file
    this.persist();
  }

  remove(doc) {
    const idx = this.get(doc.id, true);

    // removing document at matched index
    if (idx !== -1) {
      this.db.splice(idx, 1);

      // write the updated content to the file
      this.persist();
    }
  }
}

module.exports = Data;
