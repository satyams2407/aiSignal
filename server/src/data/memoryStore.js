const seedColleges = require('./seedColleges');

const clone = (value) => JSON.parse(JSON.stringify(value));

const memoryStore = {
  colleges: clone(seedColleges),
  users: [],
};

module.exports = memoryStore;
