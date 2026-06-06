const { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } = require('node:crypto');

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function base64UrlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function createPasswordHash(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, passwordHash) {
  if (!passwordHash || !passwordHash.includes(':')) {
    return false;
  }

  const [salt, storedHash] = passwordHash.split(':');
  const incomingHash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  if (storedHash.length !== incomingHash.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(storedHash, 'hex'), Buffer.from(incomingHash, 'hex'));
}

function signToken(payload, secret, expiresInSeconds) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = { ...payload, exp: now + expiresInSeconds, iat: now };
  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(fullPayload),
  )}`;
  const signature = createHmac('sha256', secret).update(unsignedToken).digest('base64url');

  return `${unsignedToken}.${signature}`;
}

function verifyToken(token, secret) {
  const [header, payload, signature] = token.split('.');

  if (!header || !payload || !signature) {
    throw new Error('Invalid token format.');
  }

  const unsignedToken = `${header}.${payload}`;
  const expectedSignature = createHmac('sha256', secret).update(unsignedToken).digest('base64url');

  if (signature !== expectedSignature) {
    throw new Error('Invalid token signature.');
  }

  const decodedPayload = JSON.parse(base64UrlDecode(payload));
  const now = Math.floor(Date.now() / 1000);

  if (decodedPayload.exp <= now) {
    throw new Error('Token has expired.');
  }

  return decodedPayload;
}

module.exports = {
  createPasswordHash,
  signToken,
  verifyPassword,
  verifyToken,
};
