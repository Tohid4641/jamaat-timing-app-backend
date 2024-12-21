const router = require("express").Router();
const authController = require("../controllers/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/signup", authController.signup);
router.post("/signin", authController.login);
router.post("/logout", authAdmin, authController.logout);
router.patch("/forgot-password", authController.updatePassword);

module.exports = router;
