const express = require('express');

const collegeController = require('../controllers/collegeController');

const router = express.Router();

router.get('/', collegeController.getColleges);
router.post('/compare', collegeController.compareColleges);
router.get('/:slug', collegeController.getCollegeDetails);

module.exports = router;
