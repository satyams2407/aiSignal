const express = require('express');

const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/me', requireAuth, userController.getCurrentUser);
router.get('/saved-colleges', requireAuth, userController.getSavedColleges);
router.post('/saved-colleges/:slug', requireAuth, userController.saveCollege);
router.delete('/saved-colleges/:slug', requireAuth, userController.removeSavedCollege);

module.exports = router;
