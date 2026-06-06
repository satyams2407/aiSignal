const env = require('../config/env');
const HttpError = require('../lib/HttpError');
const userRepository = require('../repositories/userRepository');
const { createPasswordHash, signToken, verifyPassword } = require('../utils/security');
const { parseLoginPayload, parseSignupPayload } = require('../utils/validation');

function toAuthResponse(user) {
  const token = signToken({ sub: user._id, email: user.email }, env.jwtSecret, env.tokenTtlSeconds);

  return {
    token,
    user: {
      email: user.email,
      id: user._id,
      name: user.name,
      savedCollegeSlugs: user.savedCollegeSlugs,
    },
  };
}

async function login(payload) {
  const { email, password } = parseLoginPayload(payload);
  const user = await userRepository.findUserByEmail(email);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new HttpError(401, 'Invalid email or password.');
  }

  return toAuthResponse(user);
}

async function signup(payload) {
  const { email, name, password } = parseSignupPayload(payload);
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new HttpError(409, 'An account already exists for this email.');
  }

  const user = await userRepository.createUser({
    email,
    name,
    passwordHash: createPasswordHash(password),
    savedCollegeSlugs: [],
  });

  return toAuthResponse(user);
}

module.exports = {
  login,
  signup,
};
