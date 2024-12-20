const router = require('express').Router();
const adminController = require('../controllers/admin');
const commonController = require('../controllers/common');

router.get('/test', (_,res) => res.send("TestOk"));

router.get('/countries', commonController.getCountries);
router.get('/country/:id', adminController.getCountry);
router.post('/country', adminController.addCountry);
router.patch('/country/:id', adminController.updateCountry);
router.delete('/country/:id', adminController.deleteCountry);

router.post('/state', adminController.addState);
router.get('/states', commonController.getStates);
router.get('/state/:id', adminController.getState);
router.patch('/state/:id', adminController.updateState);
router.delete('/state/:id', adminController.deleteState);

router.get('/cities', commonController.getCities);
router.post('/city', adminController.addCity);
router.get('/city/:id', adminController.getCity);
router.patch('/city/:id', adminController.updateCity);
router.delete('/city/:id', adminController.deleteCity);

router.post('/masjid', adminController.addMasjid);
router.post('/namaaz', adminController.addNamaaz);
router.post('/masjid-namaaz-timing', adminController.addMasjidNamaazTiming);

module.exports = router;