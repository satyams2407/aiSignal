require('dotenv').config();

const app = require('./src/app');
const env = require('./src/config/env');
const { connectToDatabase } = require('./src/config/database');
const { ensureSeedData } = require('./src/repositories/collegeRepository');

async function startServer() {
  const connection = await connectToDatabase();
  await ensureSeedData();

  app.listen(env.port, () => {
    console.log(
      `College discovery API is running on port ${env.port} using ${connection.mode} mode.`,
    );
  });
}

startServer().catch((error) => {
  console.error('Failed to start server.', error);
  process.exit(1);
});
