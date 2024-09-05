# Multimodal LLM Testing Instruction Generator

This tool uses a multimodal Large Language Model (LLM) to generate comprehensive and accurate testing instructions for digital product features, based on screenshots and optional textual context provided by the user. 

## Description

This tool takes screenshots of a digital product (e.g., mobile applications) and automatically generates testing instructions based on the features presented in those screenshots. The user can optionally provide additional context to make the generated instructions more relevant and accurate.

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

   
   
