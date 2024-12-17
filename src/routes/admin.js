const router = require('express').Router();
const adminController = require('../controllers/admin');

router.get('/test', (_,res) => res.send("TestOk"));

router.post('/country', adminController.addCountry);
// router.patch('/country/:id', adminController.name);
// router.delete('/country/:id', adminController.name);

// router.post('/state', adminController.name);
// router.patch('/state/:id', adminController.name);
// router.delete('/state/:id', adminController.name);

// router.post('/city', adminController.name);
// router.patch('/city/:id', adminController.name);
// router.delete('/city/:id', adminController.name);

// router.post('/masjid', adminController.name);
// router.post('/masjid-timing', adminController.name);

module.exports = router;