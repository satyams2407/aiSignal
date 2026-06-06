const env = require('../config/env');
const HttpError = require('../lib/HttpError');
const { verifyToken } = require('../utils/security');

function requireAuth(request, _response, next) {
  const headerValue = request.headers.authorization || '';
  const [scheme, token] = headerValue.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new HttpError(401, 'Authentication token is required.'));
  }

  try {
    request.auth = verifyToken(token, env.jwtSecret);
    return next();
  } catch (error) {
    return next(new HttpError(401, error.message));
  }
}

module.exports = {
  requireAuth,
};
