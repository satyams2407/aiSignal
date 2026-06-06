const env = {
  clientUrl: process.env.CLIENT_URL || '*',
  jwtSecret: process.env.JWT_SECRET || 'college-discovery-dev-secret',
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI || '',
  port: Number.parseInt(process.env.PORT || '5001', 10),
  tokenTtlSeconds: Number.parseInt(process.env.TOKEN_TTL_SECONDS || '604800', 10),
};

module.exports = env;
