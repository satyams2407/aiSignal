const College = require('../models/College');
const { isDatabaseConnected } = require('../config/database');
const seedColleges = require('../data/seedColleges');
const memoryStore = require('../data/memoryStore');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getSortValue(college, sortBy) {
  const values = {
    fees: college.fees.annualTuitionInr,
    highestPackage: college.placements.highestPackageLpa,
    nirfRank: college.nirfRank === 0 ? Number.MAX_SAFE_INTEGER : college.nirfRank,
    rating: college.rating,
  };

  return values[sortBy] ?? college.rating;
}

function buildSortComparator(sortBy, sortOrder) {
  const direction = sortOrder === 'asc' ? 1 : -1;

  return (left, right) => {
    const leftValue = getSortValue(left, sortBy);
    const rightValue = getSortValue(right, sortBy);

    if (leftValue === rightValue) {
      return left.name.localeCompare(right.name);
    }

    return leftValue > rightValue ? direction : -direction;
  };
}

function matchesCollegeFilters(college, filters) {
  const searchValue = `${college.name} ${college.location.city} ${college.location.state} ${college.overview}`.toLowerCase();
  const hasCourse =
    !filters.course ||
    college.courses.some((course) => course.name.toLowerCase().includes(filters.course.toLowerCase()));
  const hasExam = !filters.exam || college.acceptedExams.includes(filters.exam.toUpperCase());
  const matchesLocation =
    !filters.location ||
    [college.location.city, college.location.state, college.location.country]
      .join(' ')
      .toLowerCase()
      .includes(filters.location.toLowerCase());

  return (
    (!filters.search || searchValue.includes(filters.search.toLowerCase())) &&
    matchesLocation &&
    hasCourse &&
    hasExam &&
    college.rating >= filters.minRating &&
    college.fees.annualTuitionInr >= filters.minFees &&
    college.fees.annualTuitionInr <= filters.maxFees
  );
}

async function ensureSeedData() {
  if (!isDatabaseConnected()) {
    return clone(memoryStore.colleges);
  }

  const existingCount = await College.countDocuments();

  if (existingCount === 0) {
    await College.insertMany(seedColleges);
  }

  return College.find().lean();
}

async function listColleges(filters) {
  const source = isDatabaseConnected() ? await College.find().lean() : clone(memoryStore.colleges);
  const filtered = source.filter((college) => matchesCollegeFilters(college, filters));

  filtered.sort(buildSortComparator(filters.sortBy, filters.sortOrder));

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / filters.limit));
  const safePage = Math.min(filters.page, totalPages);
  const startIndex = (safePage - 1) * filters.limit;

  return {
    items: filtered.slice(startIndex, startIndex + filters.limit),
    page: safePage,
    totalItems,
    totalPages,
  };
}

async function findCollegeBySlug(slug) {
  if (isDatabaseConnected()) {
    return College.findOne({ slug }).lean();
  }

  return clone(memoryStore.colleges.find((college) => college.slug === slug) || null);
}

async function findCollegesBySlugs(slugs) {
  if (isDatabaseConnected()) {
    return College.find({ slug: { $in: slugs } }).lean();
  }

  return clone(memoryStore.colleges.filter((college) => slugs.includes(college.slug)));
}

async function findCollegesByExam(exam) {
  const normalizedExam = exam.toUpperCase();

  if (isDatabaseConnected()) {
    return College.find({ acceptedExams: normalizedExam }).lean();
  }

  return clone(memoryStore.colleges.filter((college) => college.acceptedExams.includes(normalizedExam)));
}

module.exports = {
  ensureSeedData,
  findCollegeBySlug,
  findCollegesByExam,
  findCollegesBySlugs,
  listColleges,
};
