import React, { useState } from 'react';
import axios from 'axios';
import './Doctorsignup.css';
import { Link } from 'react-router-dom';

const Doctorsignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    qualification: '',
    experience: '',
    hospital: '',
    phoneNumber: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust to your requirements
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation to ensure fields are not empty
    if (!formData.name || !formData.email || !formData.password || 
        !formData.specialization || !formData.qualification || 
        !formData.experience || !formData.hospital || !formData.phoneNumber) {
      setError('All fields are required.');
      return;
    }

    // Additional validation for email and phone number
    if (!validateEmail(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError('Invalid phone number format.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password should be at least 8 characters long.');
      return;
    }

    setLoading(true); // Start loading indicator

    try {
      const response = await axios.post('http://localhost:8080/api/doctor/register', formData);
      if (response.data.success) {
        setSuccess('Registration successful!'); // Set success message
        setFormData({
          name: '',
          email: '',
          password: '',
          specialization: '',
          qualification: '',
          experience: '',
          hospital: '',
          phoneNumber: '',
        });
      } else {
        setError(response.data.message); // Set error message from response
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        setError(error.response.data.message || 'An error occurred while submitting the form.');
      } else {
        setError('Network error: Unable to connect to the server.');
      }
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="signup-container">
      <h2>Doctor Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{capitalizeFirstLetter(key)}:</label>
            <input
              type={key === 'experience' ? 'number' : key === 'phoneNumber' ? 'tel' : 'text'}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter your ${key}`}
              required
            />
          </div>
        ))}

        <button type="submit" className='btn btn-success' disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <Link to="/" style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: 'black',
                textDecoration: 'none',
                fontWeight: 'bold',
            }}>Home</Link>
    </div>
  );
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Doctorsignup;
