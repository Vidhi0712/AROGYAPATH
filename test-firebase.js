const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  console.log('✅ Firebase initialized successfully!');
  console.log('Project ID:', serviceAccount.project_id);
  
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message);
}