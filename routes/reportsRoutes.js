const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

router.post('/upload', reportsController.uploadReport);
router.get('/user/:userId', reportsController.getReports);
router.get('/:reportId', reportsController.getReportById);

module.exports = router;