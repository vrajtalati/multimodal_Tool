import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  
  const [context, setContext] = useState('');
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setImages(prevImages => [...prevImages, ...uploadedFiles]);
  };

  // HandleSubmit Function

  const handleSubmit = async () => {
    const formData = new FormData();
  
    // Append the context to the form data
    if (context) {
      formData.append('context', context);
    }
  
    // Append each image to the form data
    images.forEach((image, index) => {
      formData.append('images', image);
    });
  
    try {
      const response = await fetch('http://localhost:3001/api/generate-instructions', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Generated Instructions:', data);
        // Handle the response data, e.g., display it to the user
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Testing Instruction Generator</h1>
      <textarea 
        placeholder="Optional context..." 
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        onChange={handleImageUpload} 
      />
      <button onClick={handleSubmit}>Describe Testing Instructions</button>
      
      {/* Display selected images */}
      <div>
        {images.map((image, index) => (
          <img 
            key={index} 
            src={URL.createObjectURL(image)} 
            alt={`upload-${index}`} 
            style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
