const { db } = require('../config/firebase');

// Add new vital reading
exports.addVital = async (req, res) => {
  try {
    const { userId, type, value, date } = req.body;

    if (!userId || !type || !value) {
      return res.status(400).json({
        success: false,
        message: 'userId, type, and value are required'
      });
    }

    const vitalData = {
      userId,
      type,
      value: parseFloat(value),
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('vitals').add(vitalData);

    res.status(201).json({
      success: true,
      message: 'Vital added successfully',
      vitalId: docRef.id,
      data: vitalData
    });

  } catch (error) {
    console.error('Add Vital Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get vitals - SIMPLE VERSION
exports.getVitals = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const snapshot = await db.collection('vitals')
      .where('userId', '==', userId)
      .get();

    const vitals = [];
    snapshot.forEach(doc => {
      vitals.push({
        id: doc.id,
        ...doc.data()
      });
    });

    vitals.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      success: true,
      count: vitals.length,
      data: vitals
    });

  } catch (error) {
    console.error('Get Vitals Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Risk Score - SIMPLE VERSION
exports.getRiskScore = async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db.collection('vitals')
      .where('userId', '==', userId)
      .get();

    const bpReadings = [];
    const sugarReadings = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.type === 'bp_systolic') {
        bpReadings.push(data.value);
      } else if (data.type === 'sugar') {
        sugarReadings.push(data.value);
      }
    });

    let riskScore = 0;
    let warnings = [];

    if (bpReadings.length > 0) {
      const avgBP = bpReadings.reduce((a, b) => a + b, 0) / bpReadings.length;
      
      if (avgBP > 140) {
        riskScore += 30;
        warnings.push('High Blood Pressure detected');
      } else if (avgBP > 130) {
        riskScore += 15;
        warnings.push('Elevated Blood Pressure');
      }
    }

    if (sugarReadings.length > 0) {
      const avgSugar = sugarReadings.reduce((a, b) => a + b, 0) / sugarReadings.length;
      
      if (avgSugar > 140) {
        riskScore += 30;
        warnings.push('High Blood Sugar detected');
      } else if (avgSugar > 100) {
        riskScore += 15;
        warnings.push('Elevated Blood Sugar');
      }
    }

    let riskLevel = 'Low';
    if (riskScore > 40) riskLevel = 'High';
    else if (riskScore > 20) riskLevel = 'Medium';

    res.status(200).json({
      success: true,
      riskScore,
      riskLevel,
      warnings,
      recommendations: warnings.length > 0 ? 'Consult a doctor' : 'Keep monitoring regularly'
    });

  } catch (error) {
    console.error('Risk Score Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};