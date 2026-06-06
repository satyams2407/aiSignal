const authService = require('../services/authService');

async function login(request, response, next) {
  try {
    const result = await authService.login(request.body);
    response.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

async function signup(request, response, next) {
  try {
    const result = await authService.signup(request.body);
    response.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  signup,
};
