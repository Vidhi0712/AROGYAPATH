const express = require('express');
const router = express.Router();
const ocrController = require('../controllers/ocrController');

router.post('/analyze', ocrController.analyzeReport);
router.get('/report/:reportId', ocrController.getAnalyzedReport);
router.get('/user/:userId', ocrController.getUserReports);

module.exports = router;