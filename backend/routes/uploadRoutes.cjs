// backend/routes/uploadRoutes.cjs
const express = require('express');
const router = express.Router();
const imagekit = require('../config/imagekitConfig.cjs'); // Import your ImageKit config

// Route to handle image uploads
router.post('/image', async (req, res) => { // Endpoint will be /api/upload/image
  try {
    // Check if files were uploaded using express-fileupload
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      return res.status(400).json({ message: 'No image file was uploaded.' });
    }

    const file = req.files.image; // 'image' is the name of the input field in your form/Postman

    // Upload file to ImageKit
    const uploadResult = await imagekit.upload({
      file: file.data.toString('base64'), // Convert buffer to base64 string
      fileName: file.name,               // Original filename
      folder: '/arova_products'          // Optional: specify a folder in ImageKit.io
    });

    // Send back the ImageKit URL and File ID
    res.status(200).json({
      message: 'Image uploaded successfully!',
      imageUrl: uploadResult.url,       // The public URL of the uploaded image
      fileId: uploadResult.fileId       // ImageKit.io's unique ID for the file (useful for deletion)
    });

  } catch (error) {
    console.error('❌ ImageKit upload error:', error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
});

module.exports = router; // Export the router