const { auth, db, admin } = require('../config/firebase');

// Signup
// Signup
exports.signup = async (req, res) => {
  try {
    const { email, password, name, age, gender } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password and name are required'
      });
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name
    });

    // Store additional user data in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name: name,
      email: email,
      age: age || null,
      gender: gender || null,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      userId: userRecord.uid
    });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Login (verify user exists)
exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    // Get user by email
    const userRecord = await auth.getUserByEmail(email);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      userId: userRecord.uid
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
};