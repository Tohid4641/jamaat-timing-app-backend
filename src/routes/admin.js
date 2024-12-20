const router = require('express').Router();
const adminController = require('../controllers/admin');

router.get('/test', (_,res) => res.send("TestOk"));

router.get('/countries', adminController.getCountries);
router.get('/country/:id', adminController.getCountry);
router.post('/country', adminController.addCountry);
router.patch('/country/:id', adminController.updateCountry);
router.delete('/country/:id', adminController.deleteCountry);

router.post('/state', adminController.addState);
router.get('/states', adminController.getStates);
router.get('/state/:id', adminController.getState);
router.patch('/state/:id', adminController.updateState);
router.delete('/state/:id', adminController.deleteState);

router.get('/cities', adminController.getCities);
router.post('/city', adminController.addCity);
router.get('/city/:id', adminController.getCity);
router.patch('/city/:id', adminController.updateCity);
router.delete('/city/:id', adminController.deleteCity);

router.post('/masjid', adminController.addMasjid);
// router.post('/masjid-timing', adminController.name);

module.exports = router;