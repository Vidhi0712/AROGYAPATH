const { db } = require('../config/firebase');

// Upload report metadata (file URL from frontend)
exports.uploadReport = async (req, res) => {
  try {
    const { userId, reportName, reportType, fileUrl, uploadDate } = req.body;

    if (!userId || !reportName || !fileUrl) {
      return res.status(400).json({
        success: false,
        message: 'userId, reportName, and fileUrl are required'
      });
    }

    const reportData = {
      userId,
      reportName,
      reportType: reportType || 'general',
      fileUrl,
      uploadDate: uploadDate || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('reports').add(reportData);

    res.status(201).json({
      success: true,
      message: 'Report uploaded successfully',
      reportId: docRef.id,
      data: reportData
    });

  } catch (error) {
    console.error('Upload Report Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all reports for a user
exports.getReports = async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db.collection('reports')
      .where('userId', '==', userId)
      .get();

    const reports = [];
    snapshot.forEach(doc => {
      reports.push({
        id: doc.id,
        ...doc.data()
      });
    });

    reports.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });

  } catch (error) {
    console.error('Get Reports Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single report
exports.getReportById = async (req, res) => {
  try {
    const { reportId } = req.params;

    const doc = await db.collection('reports').doc(reportId).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data()
      }
    });

  } catch (error) {
    console.error('Get Report Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};