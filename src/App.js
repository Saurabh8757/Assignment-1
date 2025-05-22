import { useState } from 'react';
import Form from './components/Form';
import SuccessPage from './components/SuccessPage';

function App() {
  const [formData, setFormData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setIsSubmitted(true);
  };

  const handleBackToForm = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="app-container">
      {isSubmitted ? (
        <SuccessPage formData={formData} onBack={handleBackToForm} />
      ) : (
        <Form onFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default App;