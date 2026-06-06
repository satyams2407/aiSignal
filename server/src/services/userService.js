const HttpError = require('../lib/HttpError');
const collegeRepository = require('../repositories/collegeRepository');
const userRepository = require('../repositories/userRepository');

async function getCurrentUser(userId) {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new HttpError(404, 'User not found.');
  }

  return {
    email: user.email,
    id: user._id,
    name: user.name,
    savedCollegeSlugs: user.savedCollegeSlugs,
  };
}

async function getSavedColleges(userId) {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new HttpError(404, 'User not found.');
  }

  const colleges = await collegeRepository.findCollegesBySlugs(user.savedCollegeSlugs);

  return {
    items: colleges,
    totalItems: colleges.length,
  };
}

async function saveCollege(userId, slug) {
  const college = await collegeRepository.findCollegeBySlug(slug);

  if (!college) {
    throw new HttpError(404, 'College not found.');
  }

  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new HttpError(404, 'User not found.');
  }

  const updatedUser = await userRepository.saveCollegeForUser(userId, slug);

  return {
    savedCollegeSlugs: updatedUser.savedCollegeSlugs,
  };
}

async function removeSavedCollege(userId, slug) {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new HttpError(404, 'User not found.');
  }

  const updatedUser = await userRepository.removeSavedCollegeForUser(userId, slug);

  return {
    savedCollegeSlugs: updatedUser.savedCollegeSlugs,
  };
}

module.exports = {
  getCurrentUser,
  getSavedColleges,
  removeSavedCollege,
  saveCollege,
};
