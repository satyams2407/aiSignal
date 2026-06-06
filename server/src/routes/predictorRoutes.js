const express = require('express');

const collegeController = require('../controllers/collegeController');

const router = express.Router();

router.post('/', collegeController.predictColleges);

module.exports = router;
