// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');

// Import the LLM service
const { generateTestInstructions } = require('./llmService');

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());               // Enable CORS for all routes
app.use(express.json());        // Enable JSON body parsing

// Configure multer for file uploads (images stored in 'uploads/' temporarily)
const upload = multer({ dest: 'uploads/' });

// Route: Handle the form submission to generate testing instructions
app.post('/api/generate-instructions', upload.array('images'), async (req, res) => {
  try {
    const { context } = req.body;
    const files = req.files;

    // Validate input: Ensure context or images are provided
    if (!context && (!files || files.length === 0)) {
      return res.status(400).json({ error: 'Context or images are required.' });
    }

    // Call the LLM service to generate test instructions
    const generatedInstructions = await generateTestInstructions(context, files);

    // Clean up uploaded files from the server after processing
    files.forEach(file => {
      fs.unlink(file.path, err => {
        if (err) console.error(`Error deleting file ${file.path}:`, err);
      });
    });

    // Send the generated instructions back to the client
    res.json(generatedInstructions);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while processing the request.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
