import React, { useState } from 'react';
import axios from 'axios';
import './Doctorsignup.css';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    setSuccess(''); // Reset success state
    
    try {
      const response = await axios.post('http://localhost:8080/api/doctor/register', formData);
      if (response.data.success) {
        setSuccess('Registration successful!'); // Set success message
        console.log('sett');
        
        // Reset form fields
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
      setError('An error occurred while submitting the form.'); // General error message
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

        <button type="submit" className='btn btn-success'>Sign Up</button>
      </form>
    </div>
  );
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Doctorsignup;