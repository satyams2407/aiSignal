const test = require('node:test');
const assert = require('node:assert/strict');

const collegeService = require('../src/services/collegeService');

test('lists colleges with search and pagination metadata', async () => {
  const result = await collegeService.getCollegeList({
    limit: '2',
    page: '1',
    search: 'Delhi',
    sortBy: 'rating',
    sortOrder: 'desc',
  });

  assert.equal(result.page, 1);
  assert.equal(result.items.length, 2);
  assert.ok(result.totalItems >= 2);
});

test('compares two colleges in requested order', async () => {
  const result = await collegeService.getCollegeComparison({
    slugs: ['nit-trichy', 'dtu'],
  });

  assert.deepEqual(
    result.map((college) => college.slug),
    ['nit-trichy', 'dtu'],
  );
});

test('predictor returns ranked recommendations', async () => {
  const result = await collegeService.getPredictedColleges({
    exam: 'jee_main',
    rank: 18000,
  });

  assert.equal(result.exam, 'JEE_MAIN');
  assert.ok(result.recommendations.length > 0);
});
