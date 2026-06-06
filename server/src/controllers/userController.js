const userService = require('../services/userService');

async function getCurrentUser(request, response, next) {
  try {
    const user = await userService.getCurrentUser(request.auth.sub);
    response.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function getSavedColleges(request, response, next) {
  try {
    const result = await userService.getSavedColleges(request.auth.sub);
    response.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

async function saveCollege(request, response, next) {
  try {
    const result = await userService.saveCollege(request.auth.sub, request.params.slug);
    response.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

async function removeSavedCollege(request, response, next) {
  try {
    const result = await userService.removeSavedCollege(request.auth.sub, request.params.slug);
    response.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCurrentUser,
  getSavedColleges,
  removeSavedCollege,
  saveCollege,
};
