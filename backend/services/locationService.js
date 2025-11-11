/**
 * Location Verification Service
 * GPS-based location verification
 */

const geolib = require('geolib');

/**
 * Verify if user is within allowed radius of restaurant
 */
function verifyLocation(
  userLatitude,
  userLongitude,
  restaurantLatitude,
  restaurantLongitude,
  allowedRadiusMeters = 100
) {
  try {
    const distance = geolib.getDistance(
      {latitude: userLatitude, longitude: userLongitude},
      {latitude: restaurantLatitude, longitude: restaurantLongitude}
    );

    return distance <= allowedRadiusMeters;
  } catch (error) {
    console.error('Location verification error:', error);
    return false;
  }
}

/**
 * Get distance between two coordinates
 */
function getDistance(lat1, lon1, lat2, lon2) {
  return geolib.getDistance(
    {latitude: lat1, longitude: lon1},
    {latitude: lat2, longitude: lon2}
  );
}

/**
 * Check if coordinates are valid
 */
function isValidCoordinates(latitude, longitude) {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

module.exports = {
  verifyLocation,
  getDistance,
  isValidCoordinates,
};

