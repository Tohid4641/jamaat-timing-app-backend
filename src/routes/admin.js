const router = require('express').Router();
const adminController = require('../controllers/admin');

router.get('/test', (_,res) => res.send("TestOk"));

router.post('/country', adminController.addCountry);
router.patch('/country/:id', adminController.updateCountry);
router.delete('/country/:id', adminController.deleteCountry);

router.post('/state', adminController.addState);
router.patch('/state/:id', adminController.updateState);
router.delete('/state/:id', adminController.deleteState);

// router.post('/city', adminController.addCity);
// router.patch('/city/:id', adminController.updateCity);
// router.delete('/city/:id', adminController.deleteCity);

// router.post('/masjid', adminController.name);
// router.post('/masjid-timing', adminController.name);

module.exports = router;