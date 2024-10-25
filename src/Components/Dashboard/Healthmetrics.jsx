import React, { useState } from 'react';
import Navbar from '../Dashboard/Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Healthmetrics = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    systolicBP: '',
    diastolicBP: '',
    bloodSugar: '',
    heartRate: '',
    bodyTemperature: '',
    token:localStorage.getItem('token'),  
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted Data:', formData);
    try {
      const res = await axios.post('http://localhost:8080/api/health/add', formData);
      console.log('Adding successful:', res.data);
      // Optionally redirect or show a success message
      navigate('/dashboard/health')
    } catch (error) {
      console.error('Error during adding:', error.response?.data || error.message);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="disease-form">
      <Navbar/>
      <h2>Enter Your Health Conditions</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Systolic BP:</label>
          <input
            type="number"
            name="systolicBP"
            value={formData.systolicBP}
            onChange={handleChange}
            placeholder="Enter Systolic BP"
            required
          />
        </div>
        <div>
          <label>Diastolic BP:</label>
          <input
            type="number"
            name="diastolicBP"
            value={formData.diastolicBP}
            onChange={handleChange}
            placeholder="Enter Diastolic BP"
            required
          />
        </div>
        <div>
          <label>Blood Sugar (BS):</label>
          <input
            type="number"
            name="bloodSugar"
            value={formData.bloodSugar}
            onChange={handleChange}
            placeholder="Enter Blood Sugar level"
            required
          />
        </div>
        <div>
          <label>Heart Rate:</label>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            placeholder="Enter Heart Rate"
            required
          />
        </div>
        <div>
          <label>Body Temperature:</label>
          <input
            type="number"
            name="bodyTemperature"
            value={formData.bodyTemperature}
            onChange={handleChange}
            placeholder="Enter Body Temperature"
            required
          />
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Healthmetrics;
