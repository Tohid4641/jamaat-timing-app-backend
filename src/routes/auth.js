const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/signin', authController.login);
router.post('/logout', authController.logout);
router.patch('/forgot-password', authController.updatePassword);

module.exports = router;