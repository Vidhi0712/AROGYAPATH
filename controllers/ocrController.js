const { GoogleGenerativeAI } = require('@google/generative-ai');
const { db } = require('../config/firebase');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Analyze lab report using Gemini Vision (OCR + Analysis combined)
exports.analyzeReport = async (req, res) => {
  try {
    const { imageUrl, userId } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'imageUrl is required'
      });
    }

    console.log('🤖 Analyzing image with Gemini Vision...');

    // Fetch image from URL
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');

    // Use Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a medical lab report analyzer. Analyze this lab report image and extract all health metrics.

Provide a detailed JSON response with:
{
  "extractedText": "Raw text you can read from the image",
  "metrics": {
    "hemoglobin": {"value": number or null, "unit": "g/dL", "status": "normal/low/high/unknown"},
    "wbc": {"value": number or null, "unit": "cells/μL", "status": "normal/low/high/unknown"},
    "rbc": {"value": number or null, "unit": "million/μL", "status": "normal/low/high/unknown"},
    "platelets": {"value": number or null, "unit": "lakhs/μL", "status": "normal/low/high/unknown"},
    "glucose": {"value": number or null, "unit": "mg/dL", "status": "normal/low/high/unknown"},
    "cholesterol": {"value": number or null, "unit": "mg/dL", "status": "normal/low/high/unknown"}
  },
  "summary": "Brief 2-3 line summary in simple language explaining the overall health status",
  "warnings": ["List any concerning values that need attention, empty array if all normal"],
  "recommendations": ["Practical health advice based on the results"]
}

Return ONLY valid JSON, no markdown formatting.`;

    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg"
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    let analysisText = response.text();

    // Clean response
    analysisText = analysisText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const analysis = JSON.parse(analysisText);

    // Save to database
    const reportData = {
      userId,
      imageUrl,
      analysis,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('analyzed_reports').add(reportData);

    res.status(200).json({
      success: true,
      reportId: docRef.id,
      message: 'Lab report analyzed successfully',
      data: analysis
    });

  } catch (error) {
    console.error('OCR Analysis Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get analyzed report by ID
exports.getAnalyzedReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    const doc = await db.collection('analyzed_reports').doc(reportId).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doc.data()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all analyzed reports for user
exports.getUserReports = async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db.collection('analyzed_reports')
      .where('userId', '==', userId)
      .get();

    const reports = [];
    snapshot.forEach(doc => {
      reports.push({
        id: doc.id,
        ...doc.data()
      });
    });

    reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};