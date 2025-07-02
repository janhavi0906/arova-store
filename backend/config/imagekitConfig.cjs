// backend/config/imagekitConfig.cjs
const ImageKit = require('imagekit');
require('dotenv').config(); // Ensure dotenv is configured to load your .env file

const imagekit = new ImageKit({
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

module.exports = imagekit; // Export the initialized ImageKit instance