export default class MemoryAdapter {
  constructor () {
    this.db = {};
  }

  add (key, value) {
    if (this.exist(key)) {
      throw new Error(`The key ${key} already exists`);
    }
    this.db[key] = value;
  }

  update (key, value) {
    if (!this.exist(key)) {
      throw new Error(`The key ${key} does not exist`);
    }
    this.db[key] = value;
  }

  remove (key) {
    if (!this.exist(key)) {
      throw new Error(`The key ${key} does not exist`);
    }
    delete this.db[key];
  }

  removePrefix (prefix) {
    this.keys(prefix).forEach(key => this.remove(key));
  }

  get (key) {
    if (!this.exist(key)) {
      throw new Error(`The key ${key} does not exist`);
    }
    return this.db[key];
  }

  keys (prefix = '') {
    return Object.keys(this.db).filter(key => key.startsWith(prefix));
  }

  exist (key) {
    return this.db[key] !== undefined;
  }
}
