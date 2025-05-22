const SuccessPage = ({ formData, onBack }) => {
  return (
    <div className="success-wrapper fade-in">
      <div className="success-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h1 className="success-title">Registration Successful!</h1>
        <p className="success-message">Your account has been created successfully.</p>
        
        <div className="details-container">
          <h2>Your Details:</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Username:</span>
              <span className="detail-value">{formData.username}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{formData.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{formData.phoneCode} {formData.phoneNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{formData.city}, {formData.country}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">PAN:</span>
              <span className="detail-value">{formData.panNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Aadhar:</span>
              <span className="detail-value">{formData.aadharNumber}</span>
            </div>
          </div>
        </div>
        
        <button onClick={onBack} className="back-btn">
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;