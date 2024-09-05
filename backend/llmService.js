// llmService.js
const axios = require('axios');
const fs = require('fs');

/**
 * Calls OpenAI API with context and images to generate test instructions.
 * @param {string} context - Textual context for generating instructions.
 * @param {Array} files - Array of file objects with image paths.
 * @returns {Promise<string>} - Generated instructions from the LLM.
 */
async function generateTestInstructions(context, files) {
  try {
    // Prepare messages for OpenAI API
    const messages = [
      {
        role: "system",
        content: "You are an expert AI engineering assistant specializing in software testing and quality assurance. Your task is to generate comprehensive and accurate test case descriptions for digital product features based on a set of screenshots from a mobile application, along with optional textual context provided by the user..."
      },
      {
        role: "user",
        content: context || ""
      },
      {
        role: "user",
        content: files.map((file) => ({
          type: "image_url",
          image_url: { url: `data:image/jpeg;base64,${fs.readFileSync(file.path).toString('base64')}` }
        }))
      }
    ];

    // Configure payload for OpenAI API
    const openaiPayload = {
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 7305,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    // Make the API request to OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      openaiPayload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return the generated instructions
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating instructions:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = { generateTestInstructions };
