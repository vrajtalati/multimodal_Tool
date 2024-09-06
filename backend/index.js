require('dotenv').config();
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to handle JSON bodies
app.use(express.json());

// Route to handle the form submission
app.post('/api/generate-instructions', upload.array('images'), async (req, res) => {
  try {
    const { context } = req.body;
    const files = req.files;

    if (!context && (!files || files.length === 0)) {
      return res.status(400).json({ error: 'Context or images are required.' });
    }

    // Initialize FormData for OpenAI API
    const formData = new FormData();

    // Append the context to the form data
    if (context) {
      formData.append('context', context);
    }

    // Append each image as a base64 string to the form data
    if (files && files.length > 0) {
      for (const file of files) {
        const imageBuffer = fs.readFileSync(file.path);
        const base64Image = imageBuffer.toString('base64');
        formData.append('images', `data:image/jpeg;base64,${base64Image}`);
      }
    }

    // Configure OpenAI API request
    const openaiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          "content": [
        {
          "type": "text",
          "text": "You are an expert AI engineering assistant specializing in software testing and quality assurance. Your task is to generate comprehensive and accurate test case descriptions for digital product features based on a set of screenshots from a mobile application, along with optional textual context provided by the user.\n\nObjective:\nProduce clear, detailed, and unambiguous testing instructions for each feature, ensuring that software testers can execute the tests without confusion.\n\nGuidelines for Test Case Generation:\nAccuracy: Ensure each test case is precisely tailored to the feature as demonstrated by the provided screenshots.\nClarity: Write step-by-step instructions that are easy to follow, avoiding any ambiguity.\nComprehensiveness: Include all required information such as pre-conditions, setup steps, and any configuration needed to execute the test.\nContext Awareness: Incorporate any provided textual context to make the test cases more relevant and accurate.\nFocus on Core Features: Prioritize core app features:\nFor example : \nfor a application which is for bus booking core features might be:\nSource, Destination, and Date Selection\nBus Selection\nSeat Selection\nPick-up and Drop-off Point Selection\nAdditional Features: If screenshots indicate additional features (e.g., Offers, Filters, Bus Information), include them in the test cases as well.\nExpected Results: Clearly define the expected behavior of the app for each test case to verify correct implementation.\nEach test case should consist of:\n\nTest Case Description: A high-level summary of the test.\nPre-conditions: Any setup required before the test can be executed.\nStep-by-Step Testing Instructions: Clear, detailed instructions to carry out the test.\nExpected Results: The expected behavior or output when the test is executed correctly.\nGenerate each test case with these guidelines in mind, ensuring clarity, accuracy, and relevance."
        }
      ]
        },
        {
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": "Topic: How to Write Test Cases: A Step-by-Step Guide\nIntroduction: If I were to explain how to write a manual test case in just two lines, it would be:\nIdentify the feature or functionality you wish to test.\nCreate a list of test cases that define specific actions to validate the functionality.\nLet’s now go through the detailed steps for writing test cases.\nStep 1 – Test Case ID:\nAssign a unique identifier to the test case for easy recall and future reference. Example: TC-01: Verify Login Functionality for a User\nStep 2 – Test Case Description:\nDescribe the purpose of the test case, outlining what it is designed to validate, along with a brief overview of the expected behavior. Example: Test Case Description: Test for Logging into the Application\nGiven: A valid username and password for the web application\nWhen: User enters the username and password in the login page\nThen: The user should be able to log in successfully, and the application’s Home page should be displayed.\nStep 3 – Pre-Conditions:\nList any prerequisites that need to be in place for the test to run properly, such as environment setup or pre-executed tests. Example:\nThe test environment must mimic the production environment (e.g., same hardware, OS, and software).\nStep 4 – Test Steps:\nDocument the step-by-step actions necessary to execute the test case. Example:\nLaunch the login page of the application.\nEnter a valid username and password.\nClick the ‘Login’ button.\nVerify the user is logged in successfully.\nLog out and verify the user is logged out of the system.\nStep 5 – Test Data:\nDefine any necessary data inputs for testing, such as valid or invalid credentials. Example: Test invalid login using incorrect username/password combinations.\nStep 6 – Expected Result:\nClearly state the result expected from executing the test. Examples:\nThe application should allow a user with valid credentials to log in.\nThe application should reject invalid credentials and display an appropriate error message."
            }
          ]
        },
        {
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": "If the user does not provide what features testing instruction you have to write than first find the features yourself from the image provided and then write the testing instruction .\n\nall the images are in sequence so check if any function need login or not also "
            }
          ]
        },
    

        {
          role: "user",
          content: context || ""
        },
        {
          role: "user",
          content: files.map((file) => ({
            "type": "image_url",
            "image_url": { "url": `data:image/jpeg;base64,${fs.readFileSync(file.path).toString('base64')}`}
          }))
        }
      ],
      temperature: 0.7,
      max_tokens: 7305,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "text"
      },
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Clean up uploaded files
    files.forEach(file => {
      fs.unlink(file.path, err => {
        if (err) console.error(`Error deleting file ${file.path}:`, err);
      });
    });

    // Send the response from the OpenAI API back to the client
    const ans=openaiResponse.data.choices[0].message.content;
    console.log(openaiResponse.data);
      

    res.json(ans);

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).send('An error occurred while processing the request.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});