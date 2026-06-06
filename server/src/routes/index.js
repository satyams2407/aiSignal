const express = require('express');

const authRoutes = require('./authRoutes');
const collegeRoutes = require('./collegeRoutes');
const predictorRoutes = require('./predictorRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/colleges', collegeRoutes);
router.use('/predictor', predictorRoutes);
router.use('/users', userRoutes);

module.exports = router;
