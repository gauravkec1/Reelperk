/**
 * File Upload Utility
 * Handles S3 or Firebase Storage uploads
 */

const AWS = require('aws-sdk');
const sharp = require('sharp');

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
});

/**
 * Upload image to S3
 */
async function uploadToS3(fileBuffer, fileName, folder = 'uploads') {
  try {
    // Resize and optimize image
    const optimizedImage = await sharp(fileBuffer)
      .resize(1200, 1200, {fit: 'inside', withoutEnlargement: true})
      .jpeg({quality: 85})
      .toBuffer();

    const key = `${folder}/${Date.now()}-${fileName}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET || 'reelperk-uploads',
      Key: key,
      Body: optimizedImage,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    };

    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error('S3 upload error:', error);
    // Fallback to local storage or Firebase
    throw error;
  }
}

/**
 * Upload selfie for attendance
 */
async function uploadSelfie(fileBuffer, employeeId, type) {
  const fileName = `selfie-${type}-${employeeId}.jpg`;
  return await uploadToS3(fileBuffer, fileName, 'attendance');
}

/**
 * Upload menu item image
 */
async function uploadMenuImage(fileBuffer, itemId) {
  const fileName = `menu-${itemId}.jpg`;
  return await uploadToS3(fileBuffer, fileName, 'menu');
}

module.exports = {
  uploadToS3,
  uploadSelfie,
  uploadMenuImage,
};

