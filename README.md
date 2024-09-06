# Multimodal LLM Testing Instruction Generator

This tool uses a multimodal Large Language Model (LLM) to generate comprehensive and accurate testing instructions for digital product features, based on screenshots and optional textual context provided by the user. 

## Description

This tool takes screenshots of a digital product (e.g., mobile applications) and automatically generates testing instructions based on the features presented in those screenshots. The user can optionally provide additional context to make the generated instructions more relevant and accurate.

## Images:
 
  ![Screenshot (50)](https://github.com/user-attachments/assets/0c299470-a09a-4caf-a417-1d946dc27ed2)
 ![Screenshot (51)](https://github.com/user-attachments/assets/3b311f17-2d30-461e-bb4b-3deece704bc5)



## Prompting Strategy Overview

The application utilizes a multimodal AI model to generate comprehensive test case descriptions based on mobile app screenshots and optional textual context. The AI is instructed to follow these core principles:

1. **Accuracy**: Test cases are tailored precisely to the features visible in the screenshots, ensuring relevance and correctness.
2. **Clarity**: Clear and step-by-step testing instructions are provided to avoid any ambiguity.
3. **Comprehensiveness**: Each test case includes detailed pre-conditions, test steps, expected results, and post-conditions.
4. **Context Awareness**: Optional textual input is used to refine and enhance the generated test cases.
5. **Feature Identification**: If the user does not specify features for testing, the AI autonomously identifies them from the provided images.

This approach ensures that test case generation is efficient, precise, and easy for software testers to follow.


### Key Features:
- **Multimodal input**: Accepts both images and text for generating the testing instructions.
- **Detailed test cases**: Produces clear, step-by-step testing instructions that include pre-conditions, test steps, and expected results.
- **Core feature detection**: Automatically identifies core app features from screenshots.
- **API integration**: Uses GPT-4o-mini LLM for intelligent test case generation.

## Technologies Used

### Frontend
- **React**:
- **JavaScript**: 
- **Axios**: 

### Backend
- **Node.js**: 
- **Express.js**: 

### LLM
- **GPT-4o-mini**: 
## Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/multimodal-llm-testing-tool.git
2. **Backend configuration**:
   ```bash
   cd backend 
   npm install
   node index.js
  **env variables**:
    ```bash
    
        OPENAI_API_KEY=your-openai-api-key

3. **Frontend configuration**:
   ```bash
   cd frontend
   cd Tool 
   npm install
   npm run dev

   
   
