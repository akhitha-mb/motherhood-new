import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  // Handle input change
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const res = await axios.post('http://localhost:8080/api/user/login', formData);
      console.log('Login successful:', res.data);
      // Store the token in localStorage
      localStorage.setItem('token', res.data.token);
      // Optionally redirect or show a success message
      navigate('/patientdashboard/home')
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row g-3">
          <form onSubmit={onSubmit} className="col-12 col-sm-8 col-md-6 col-lg-5 mx-auto">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success">Log In</button>
            </div>
          </form>

          <div className="col-12 text-center mt-4">
            <h6>Already have an account?</h6>
            <a href="/signup" className="btn btn-primary">Create an Account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;