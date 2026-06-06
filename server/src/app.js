const cors = require('cors');
const express = require('express');

const env = require('./config/env');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    success: true,
    data: {
      service: 'college-discovery-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
