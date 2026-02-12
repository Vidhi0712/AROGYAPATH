const admin = require('firebase-admin');

// Initialize Firebase Admin
let serviceAccount;

// Check if running on Render (production)
if (process.env.FIREBASE_CONFIG) {
  // Parse Firebase config from environment variable
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  // Use local file for development
  serviceAccount = require('./serviceAccountKey.json');
}

// Check if already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };