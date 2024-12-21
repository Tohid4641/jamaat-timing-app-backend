const router = require("express").Router();
const adminController = require("../controllers/admin");
const commonController = require("../controllers/common");
const authAdmin = require("../middlewares/authAdmin");
const authSuperAdmin = require("../middlewares/authSuperAdmin");

router.get("/test", (_, res) => res.send("TestOk"));

router.get("/countries", commonController.getCountries);
router.get("/country/:id",[authAdmin, authSuperAdmin] , adminController.getCountry);
router.post("/country", [authAdmin, authSuperAdmin] , adminController.addCountry);
router.patch("/country/:id", [authAdmin, authSuperAdmin] , adminController.updateCountry);
router.delete("/country/:id", [authAdmin, authSuperAdmin] , adminController.deleteCountry);

router.post("/state", [authAdmin, authSuperAdmin] , adminController.addState);
router.get("/states", commonController.getStates);
router.get("/state/:id", [authAdmin, authSuperAdmin] , adminController.getState);
router.patch("/state/:id", [authAdmin, authSuperAdmin] , adminController.updateState);
router.delete("/state/:id", [authAdmin, authSuperAdmin] , adminController.deleteState);

router.get("/cities", commonController.getCities);
router.post("/city", [authAdmin, authSuperAdmin] , adminController.addCity);
router.get("/city/:id", [authAdmin, authSuperAdmin] , adminController.getCity);
router.patch("/city/:id", [authAdmin, authSuperAdmin] , adminController.updateCity);
router.delete("/city/:id", [authAdmin, authSuperAdmin] , adminController.deleteCity);

router.post("/masjid", [authAdmin], commonController.addMasjid);
router.post("/namaaz", [authAdmin, authSuperAdmin] , adminController.addNamaaz);
router.post("/masjid-namaaz-timing", [authAdmin, authSuperAdmin] , adminController.addMasjidNamaazTiming);

module.exports = router;
