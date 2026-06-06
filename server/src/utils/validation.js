const HttpError = require('../lib/HttpError');

function ensureArray(value, fieldName) {
  if (!Array.isArray(value)) {
    throw new HttpError(400, `${fieldName} must be an array.`);
  }

  return value;
}

function ensureEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalizedEmail)) {
    throw new HttpError(400, 'A valid email address is required.');
  }

  return normalizedEmail;
}

function ensureInteger(value, fieldName, options = {}) {
  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue)) {
    throw new HttpError(400, `${fieldName} must be a valid integer.`);
  }

  if (options.min !== undefined && parsedValue < options.min) {
    throw new HttpError(400, `${fieldName} must be greater than or equal to ${options.min}.`);
  }

  return parsedValue;
}

function ensureString(value, fieldName, options = {}) {
  const normalizedValue = String(value || '').trim();

  if (!normalizedValue) {
    throw new HttpError(400, `${fieldName} is required.`);
  }

  if (options.minLength && normalizedValue.length < options.minLength) {
    throw new HttpError(400, `${fieldName} must be at least ${options.minLength} characters.`);
  }

  return normalizedValue;
}

function parseCollegeFilters(query = {}) {
  const allowedSortBy = ['rating', 'fees', 'highestPackage', 'nirfRank'];
  const allowedSortOrder = ['asc', 'desc'];
  const minRating = query.minRating ? Number.parseFloat(query.minRating) : 0;

  if (Number.isNaN(minRating) || minRating < 0 || minRating > 5) {
    throw new HttpError(400, 'minRating must be a number between 0 and 5.');
  }

  const filters = {
    course: query.course ? String(query.course).trim() : '',
    exam: query.exam ? String(query.exam).trim().toUpperCase() : '',
    limit: query.limit ? ensureInteger(query.limit, 'limit', { min: 1 }) : 10,
    location: query.location ? String(query.location).trim() : '',
    maxFees: query.maxFees
      ? ensureInteger(query.maxFees, 'maxFees', { min: 0 })
      : Number.MAX_SAFE_INTEGER,
    minFees: query.minFees ? ensureInteger(query.minFees, 'minFees', { min: 0 }) : 0,
    minRating,
    page: query.page ? ensureInteger(query.page, 'page', { min: 1 }) : 1,
    search: query.search ? String(query.search).trim() : '',
    sortBy: query.sortBy && allowedSortBy.includes(query.sortBy) ? query.sortBy : 'rating',
    sortOrder:
      query.sortOrder && allowedSortOrder.includes(query.sortOrder) ? query.sortOrder : 'desc',
  };

  if (filters.minFees > filters.maxFees) {
    throw new HttpError(400, 'minFees cannot be greater than maxFees.');
  }

  return filters;
}

function parseComparePayload(payload = {}) {
  const slugs = ensureArray(payload.slugs, 'slugs')
    .map((slug) => String(slug || '').trim().toLowerCase())
    .filter(Boolean);

  const uniqueSlugs = [...new Set(slugs)];

  if (uniqueSlugs.length < 2 || uniqueSlugs.length > 3) {
    throw new HttpError(400, 'Please provide 2 to 3 unique college slugs for comparison.');
  }

  return uniqueSlugs;
}

function parsePredictorPayload(payload = {}) {
  return {
    exam: ensureString(payload.exam, 'exam').toUpperCase(),
    rank: ensureInteger(payload.rank, 'rank', { min: 1 }),
  };
}

function parseSignupPayload(payload = {}) {
  return {
    email: ensureEmail(payload.email),
    name: ensureString(payload.name, 'name', { minLength: 2 }),
    password: ensureString(payload.password, 'password', { minLength: 8 }),
  };
}

function parseLoginPayload(payload = {}) {
  return {
    email: ensureEmail(payload.email),
    password: ensureString(payload.password, 'password', { minLength: 8 }),
  };
}

module.exports = {
  parseCollegeFilters,
  parseComparePayload,
  parseLoginPayload,
  parsePredictorPayload,
  parseSignupPayload,
};
