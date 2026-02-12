const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

router.get('/location', emergencyController.getLocationFromIP);
router.get('/hospitals', emergencyController.getNearbyHospitals);
router.get('/blood-banks', emergencyController.getBloodBanks);
router.get('/ambulances', emergencyController.getAmbulances);
router.post('/sos', emergencyController.sendSOS);

module.exports = router;