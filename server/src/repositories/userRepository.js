const { randomUUID } = require('node:crypto');

const { isDatabaseConnected } = require('../config/database');
const memoryStore = require('../data/memoryStore');
const User = require('../models/User');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

async function createUser(payload) {
  if (isDatabaseConnected()) {
    const user = await User.create(payload);
    return user.toObject();
  }

  const user = {
    _id: randomUUID(),
    createdAt: new Date().toISOString(),
    savedCollegeSlugs: [],
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  memoryStore.users.push(user);
  return clone(user);
}

async function findUserByEmail(email) {
  const normalizedEmail = email.toLowerCase();

  if (isDatabaseConnected()) {
    return User.findOne({ email: normalizedEmail }).lean();
  }

  return clone(memoryStore.users.find((user) => user.email === normalizedEmail) || null);
}

async function findUserById(userId) {
  if (isDatabaseConnected()) {
    return User.findById(userId).lean();
  }

  return clone(memoryStore.users.find((user) => user._id === userId) || null);
}

async function saveCollegeForUser(userId, slug) {
  if (isDatabaseConnected()) {
    const user = await User.findById(userId);

    if (!user.savedCollegeSlugs.includes(slug)) {
      user.savedCollegeSlugs.push(slug);
      await user.save();
    }

    return user.toObject();
  }

  const user = memoryStore.users.find((entry) => entry._id === userId);

  if (!user.savedCollegeSlugs.includes(slug)) {
    user.savedCollegeSlugs.push(slug);
    user.updatedAt = new Date().toISOString();
  }

  return clone(user);
}

async function removeSavedCollegeForUser(userId, slug) {
  if (isDatabaseConnected()) {
    const user = await User.findById(userId);
    user.savedCollegeSlugs = user.savedCollegeSlugs.filter((entry) => entry !== slug);
    await user.save();
    return user.toObject();
  }

  const user = memoryStore.users.find((entry) => entry._id === userId);
  user.savedCollegeSlugs = user.savedCollegeSlugs.filter((entry) => entry !== slug);
  user.updatedAt = new Date().toISOString();
  return clone(user);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  removeSavedCollegeForUser,
  saveCollegeForUser,
};
