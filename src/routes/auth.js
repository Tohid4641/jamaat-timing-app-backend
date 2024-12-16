const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
// router.get('/signin', authController.name);

module.exports = router;