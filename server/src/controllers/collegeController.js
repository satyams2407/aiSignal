const collegeService = require('../services/collegeService');

async function compareColleges(request, response, next) {
  try {
    const comparison = await collegeService.getCollegeComparison(request.body);
    response.status(200).json({ success: true, data: comparison });
  } catch (error) {
    next(error);
  }
}

async function getCollegeDetails(request, response, next) {
  try {
    const college = await collegeService.getCollegeBySlug(request.params.slug);
    response.status(200).json({ success: true, data: college });
  } catch (error) {
    next(error);
  }
}

async function getColleges(request, response, next) {
  try {
    const result = await collegeService.getCollegeList(request.query);
    response.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

async function predictColleges(request, response, next) {
  try {
    const result = await collegeService.getPredictedColleges(request.body);
    response.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  compareColleges,
  getCollegeDetails,
  getColleges,
  predictColleges,
};
