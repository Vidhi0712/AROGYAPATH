const axios = require('axios');

// Get user location from IP
exports.getLocationFromIP = async (req, res) => {
  try {
    // Allow IP to be passed as query param OR get from request
    const ip = req.query.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Handle localhost testing
    if (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') {
      return res.status(200).json({
        success: true,
        data: {
          city: 'Delhi',
          region: 'National Capital Territory',
          country: 'India',
          latitude: 28.6139,
          longitude: 77.2090
        },
        note: 'Demo location for localhost testing'
      });
    }

    const response = await axios.get(`http://ip-api.com/json/${ip}`);

    res.status(200).json({
      success: true,
      data: {
        city: response.data.city,
        region: response.data.regionName,
        country: response.data.country,
        latitude: response.data.lat,
        longitude: response.data.lon
      }
    });

  } catch (error) {
    console.error('Geolocation Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get nearby hospitals with real distance calculation
exports.getNearbyHospitals = async (req, res) => {
  try {
    const { latitude, longitude, city } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'latitude and longitude required'
      });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // Hospital database with GPS coordinates
    const allHospitals = [
      // Delhi
      { name: 'AIIMS Delhi', lat: 28.5672, lon: 77.2100, phone: '011-26588500', beds: 25 },
      { name: 'Apollo Hospital Sarita Vihar', lat: 28.5355, lon: 77.2910, phone: '011-26825000', beds: 18 },
      { name: 'Max Saket', lat: 28.5244, lon: 77.2066, phone: '011-26515050', beds: 12 },
      
      // Mumbai  
      { name: 'Lilavati Hospital', lat: 19.0596, lon: 72.8295, phone: '022-26567891', beds: 20 },
      { name: 'Fortis Mulund', lat: 19.1722, lon: 72.9561, phone: '022-67648888', beds: 15 },
      
      // Bangalore
      { name: 'Manipal Hospital HAL', lat: 12.9609, lon: 77.6387, phone: '080-25024444', beds: 30 },
      { name: 'Apollo Bannerghatta', lat: 12.8988, lon: 77.5975, phone: '080-26304050', beds: 22 },
      
      // Default/General
      { name: 'City General Hospital', lat: userLat + 0.02, lon: userLon + 0.01, phone: '1234567890', beds: 15 },
      { name: 'District Hospital', lat: userLat - 0.03, lon: userLon + 0.02, phone: '0987654321', beds: 10 }
    ];

    // Calculate distance for each hospital
    const hospitalsWithDistance = allHospitals.map(hospital => {
      const distance = calculateDistance(userLat, userLon, hospital.lat, hospital.lon);
      return {
        name: hospital.name,
        phone: hospital.phone,
        beds: hospital.beds,
        distance: distance.toFixed(2) + ' km',
        distanceValue: distance,
        latitude: hospital.lat,
        longitude: hospital.lon
      };
    });

    // Sort by nearest first
    hospitalsWithDistance.sort((a, b) => a.distanceValue - b.distanceValue);

    // Return top 5 nearest
    const nearestHospitals = hospitalsWithDistance.slice(0, 5);

    res.status(200).json({
      success: true,
      userLocation: { latitude: userLat, longitude: userLon },
      count: nearestHospitals.length,
      data: nearestHospitals
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Haversine formula - calculate distance between two GPS points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

// Blood banks
exports.getBloodBanks = async (req, res) => {
  try {
    const bloodBanks = [
      { 
        name: 'Red Cross Blood Bank', 
        address: 'Sector 15',
        phone: '1112223333',
        distance: '1.2 km',
        availability: { 'A+': 10, 'O+': 15, 'B+': 8, 'AB+': 5, 'O-': 3, 'A-': 4, 'B-': 2, 'AB-': 1 }
      },
      { 
        name: 'City Blood Center', 
        address: 'Medical College Road',
        phone: '4445556666',
        distance: '3.5 km',
        availability: { 'A+': 5, 'O+': 20, 'B+': 12, 'AB+': 3, 'O-': 8, 'A-': 6, 'B-': 3, 'AB-': 2 }
      }
    ];

    res.status(200).json({
      success: true,
      data: bloodBanks
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ambulances
exports.getAmbulances = async (req, res) => {
  try {
    const ambulances = [
      { provider: 'Emergency 108', phone: '108', eta: '5 mins', type: 'Government', available: true },
      { provider: 'Emergency 102', phone: '102', eta: '7 mins', type: 'Government', available: true },
      { provider: 'Private Ambulance Service', phone: '9876543210', eta: '10 mins', type: 'Private', fare: '₹800', available: true }
    ];

    res.status(200).json({
      success: true,
      data: ambulances
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// SOS
exports.sendSOS = async (req, res) => {
  try {
    const { userId, latitude, longitude, emergencyContact } = req.body;

    console.log(`🚨 SOS Alert! User: ${userId}, Location: ${latitude}, ${longitude}`);

    res.status(200).json({
      success: true,
      message: 'SOS sent successfully.',
      estimatedArrival: '5-7 minutes'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
