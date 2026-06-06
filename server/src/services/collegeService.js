const HttpError = require('../lib/HttpError');
const collegeRepository = require('../repositories/collegeRepository');
const {
  parseComparePayload,
  parseCollegeFilters,
  parsePredictorPayload,
} = require('../utils/validation');

async function getCollegeBySlug(slug) {
  const college = await collegeRepository.findCollegeBySlug(slug);

  if (!college) {
    throw new HttpError(404, 'College not found.');
  }

  return college;
}

async function getCollegeComparison(payload) {
  const slugs = parseComparePayload(payload);
  const colleges = await collegeRepository.findCollegesBySlugs(slugs);

  if (colleges.length !== slugs.length) {
    throw new HttpError(404, 'One or more colleges could not be found.');
  }

  return colleges.sort((left, right) => slugs.indexOf(left.slug) - slugs.indexOf(right.slug));
}

async function getCollegeList(query) {
  const filters = parseCollegeFilters(query);
  return collegeRepository.listColleges(filters);
}

async function getPredictedColleges(payload) {
  const { exam, rank } = parsePredictorPayload(payload);
  const colleges = await collegeRepository.findCollegesByExam(exam);

  const recommendations = colleges
    .map((college) => {
      const cutoff = college.cutoffProfiles.find((profile) => profile.exam === exam);

      if (!cutoff) {
        return null;
      }

      const gap = cutoff.closingRank - rank;
      const recommendationType = gap >= 15000 ? 'safe' : gap >= 0 ? 'target' : 'ambitious';
      const effectiveRank = college.nirfRank || 200;

      return {
        closingRank: cutoff.closingRank,
        college,
        rankGap: gap,
        recommendationType,
        score: Math.abs(gap) + effectiveRank * 10 - college.rating * 100,
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.score - right.score)
    .slice(0, 5);

  return {
    exam,
    rank,
    recommendations: recommendations.map(({ score, ...recommendation }) => recommendation),
  };
}

module.exports = {
  getCollegeBySlug,
  getCollegeComparison,
  getCollegeList,
  getPredictedColleges,
};
