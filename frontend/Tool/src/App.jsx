import { useState } from 'react';
import './App.css';  // Ensure you create this CSS file

function App() {
  
  const [context, setContext] = useState('');
  const [images, setImages] = useState([]);
  const [responseData, setResponseData] = useState(null); // New state to hold API response
  const [loading, setLoading] = useState(false); // For handling loading state

  const handleImageUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setImages(prevImages => [...prevImages, ...uploadedFiles]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append the context to the form data
    if (context) {
      formData.append('context', context);
    }

    // Append each image to the form data in the order they were uploaded
    images.forEach((image, index) => {
      formData.append('images', image, image.name);
    });

    try {
      setLoading(true); // Set loading state to true when the request is initiated
      const response = await fetch('http://localhost:3001/api/generate-instructions', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Generated Instructions:', data);

        // Format response to add an extra line between lines
        const formattedData = data.replace(/\n/g, '\n\n');
        setResponseData(formattedData); // Store the formatted response data
        setImages([]); // Clear images after successful submission
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading state to false after request finishes
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Testing Instruction Generator</h1>
      
      <textarea 
        className="context-input"
        placeholder="Enter optional context here..." 
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />
      
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        className="file-input"
        onChange={handleImageUpload} 
      />
      
      <button onClick={handleSubmit} className="submit-button">Describe Testing Instructions</button>
      
      {/* Display selected images */}
      <div className="image-preview">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={URL.createObjectURL(image)} 
            alt={`upload-${index}`} 
            className="uploaded-image"
          />
        ))}
      </div>

      {/* Loading spinner or message */}
      {loading && <p className="loading-text">Loading...</p>}

      {/* Display response from API */}
      {responseData && (
        <div className="response-container">
          <h2 className="response-title">Generated Instructions:</h2>
          <pre className="response-data">{responseData}</pre> {/* Display formatted text */}
        </div>
      )}
    </div>
  );
}

export default App;
