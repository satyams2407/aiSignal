const mongoose = require('mongoose');

const env = require('./env');

async function connectToDatabase() {
  if (!env.mongoUri) {
    console.warn('MONGO_URI is not set. Falling back to in-memory demo mode.');
    return { isConnected: false, mode: 'memory' };
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    return { isConnected: true, mode: 'mongo' };
  } catch (error) {
    console.warn('MongoDB connection failed. Falling back to in-memory demo mode.');
    console.warn(error.message);
    return { isConnected: false, mode: 'memory' };
  }
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = {
  connectToDatabase,
  isDatabaseConnected,
};
