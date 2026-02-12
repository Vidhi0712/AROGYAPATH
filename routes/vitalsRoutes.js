const express = require('express');
const router = express.Router();
const vitalsController = require('../controllers/vitalsController');

router.post('/add', vitalsController.addVital);
router.get('/user/:userId', vitalsController.getVitals);
router.get('/risk/:userId', vitalsController.getRiskScore);

module.exports = router;