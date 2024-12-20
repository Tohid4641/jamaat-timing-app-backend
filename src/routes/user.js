const router = require('express').Router();
const userController = require('../controllers/user');
const commonController = require('../controllers/common');

router.get('/countries', commonController.getCountries);
router.get('/states', commonController.getStates);
router.get('/cities', commonController.getCities);
router.get('/masjids', userController.getMasjids);
router.get('/masjid-namaaz-timing/:masjidId', userController.getMasjidNamaazTiming);
// router.get('/masjid/:id', userController.name);

module.exports = router;