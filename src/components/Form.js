import { useState, useEffect } from 'react';

const countries = [
  { name: 'India', code: 'IN', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'] },
  { name: 'USA', code: 'US', cities: ['New York', 'Los Angeles', 'Chicago'] },
  { name: 'UK', code: 'GB', cities: ['London', 'Manchester', 'Birmingham'] }
];

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' }
];

const Form = ({ onFormSubmit }) => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cities, setCities] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  // Update cities when country changes
  useEffect(() => {
    if (formValues.country) {
      const selectedCountry = countries.find(c => c.name === formValues.country);
      setCities(selectedCountry?.cities || []);
      setFormValues(prev => ({ ...prev, city: '' }));
    }
  }, [formValues.country]);

  // Validate form on every change
  useEffect(() => {
    const validateField = (name, value) => {
      switch (name) {
        case 'firstName':
          return value.trim() ? '' : 'First name is required';
        case 'lastName':
          return value.trim() ? '' : 'Last name is required';
        case 'username':
          return value.trim() ? '' : 'Username is required';
        case 'email':
          if (!value.trim()) return 'Email is required';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
          return '';
        case 'password':
          if (!value) return 'Password is required';
          if (value.length < 8) return 'Password must be at least 8 characters';
          return '';
        case 'phoneNumber':
          if (!value.trim()) return 'Phone number is required';
          if (!/^\d{10}$/.test(value)) return 'Phone number must be 10 digits';
          return '';
        case 'country':
          return value ? '' : 'Country is required';
        case 'city':
          return value ? '' : 'City is required';
        case 'panNumber':
          if (!value.trim()) return 'PAN number is required';
          if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) return 'Invalid PAN format';
          return '';
        case 'aadharNumber':
          if (!value.trim()) return 'Aadhar number is required';
          if (!/^\d{12}$/.test(value)) return 'Aadhar must be 12 digits';
          return '';
        default:
          return '';
      }
    };

    // Validate all fields
    const newErrors = {};
    let isValid = true;

    Object.keys(formValues).forEach(key => {
      if (key !== 'showPassword' && key !== 'phoneCode') {
        const error = validateField(key, formValues[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        onFormSubmit(formValues);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const togglePasswordVisibility = () => {
    setFormValues(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  return (
    <div className="form-wrapper slide-in">
      <div className="form-header">
        <h1 className="form-title">Create Account</h1>
        <div className="form-progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="form-body">
        <div className="form-grid">
          {/* First Name */}
          <div className={`form-group ${errors.firstName ? 'error' : ''}`}>
            <label>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="error-message pulse">{errors.firstName}</span>}
          </div>

          {/* Last Name */}
          <div className={`form-group ${errors.lastName ? 'error' : ''}`}>
            <label>Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="error-message pulse">{errors.lastName}</span>}
          </div>

          {/* Username */}
          <div className={`form-group ${errors.username ? 'error' : ''}`}>
            <label>Username*</label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
            {errors.username && <span className="error-message pulse">{errors.username}</span>}
          </div>

          {/* Email */}
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            {errors.email && <span className="error-message pulse">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <label>Password*</label>
            <div className="password-container">
              <input
                type={formValues.showPassword ? "text" : "password"}
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password"
                aria-label={formValues.showPassword ? "Hide password" : "Show password"}
              >
                {formValues.showPassword ? '👁️' : '🔒'}
              </button>
            </div>
            {errors.password && <span className="error-message pulse">{errors.password}</span>}
          </div>

          {/* Phone Number */}
          <div className={`form-group ${errors.phoneNumber ? 'error' : ''}`}>
            <label>Phone Number*</label>
            <div className="phone-input-group">
              <select
                name="phoneCode"
                value={formValues.phoneCode}
                onChange={handleChange}
                className="country-code"
              >
                {countryCodes.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleChange}
                placeholder="1234567890"
                className="phone-number"
              />
            </div>
            {errors.phoneNumber && <span className="error-message pulse">{errors.phoneNumber}</span>}
          </div>

          {/* Country */}
          <div className={`form-group ${errors.country ? 'error' : ''}`}>
            <label>Country*</label>
            <select
              name="country"
              value={formValues.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <span className="error-message pulse">{errors.country}</span>}
          </div>

          {/* City */}
          <div className={`form-group ${errors.city ? 'error' : ''}`}>
            <label>City*</label>
            <select
              name="city"
              value={formValues.city}
              onChange={handleChange}
              disabled={!formValues.country}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <span className="error-message pulse">{errors.city}</span>}
          </div>

          {/* PAN Number */}
          <div className={`form-group ${errors.panNumber ? 'error' : ''}`}>
            <label>PAN Number*</label>
            <input
              type="text"
              name="panNumber"
              value={formValues.panNumber}
              onChange={handleChange}
              placeholder="ABCDE1234F"
              maxLength="10"
            />
            {errors.panNumber && <span className="error-message pulse">{errors.panNumber}</span>}
          </div>

          {/* Aadhar Number */}
          <div className={`form-group ${errors.aadharNumber ? 'error' : ''}`}>
            <label>Aadhar Number*</label>
            <input
              type="text"
              name="aadharNumber"
              value={formValues.aadharNumber}
              onChange={handleChange}
              placeholder="12-digit number"
              maxLength="12"
            />
            {errors.aadharNumber && <span className="error-message pulse">{errors.aadharNumber}</span>}
          </div>
        </div>

        <button
          type="submit"
          className={`submit-btn ${isFormValid ? 'valid' : ''}`}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner"></span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;