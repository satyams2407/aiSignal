const test = require('node:test');
const assert = require('node:assert/strict');

const authService = require('../src/services/authService');

test('signup creates a user and returns an auth token', async () => {
  const response = await authService.signup({
    email: 'backend.demo@example.com',
    name: 'Backend Demo',
    password: 'supersecure123',
  });

  assert.ok(response.token);
  assert.equal(response.user.email, 'backend.demo@example.com');
});

test('login rejects invalid credentials', async () => {
  await assert.rejects(
    authService.login({
      email: 'missing@example.com',
      password: 'wrongpassword',
    }),
    /Invalid email or password/,
  );
});
