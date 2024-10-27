import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    
    // State hooks for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [doctor, setSelectedDoctor] = useState('');
    const [expectedDelivery, setExpectedDelivery] = useState('');
    const [diseases, setDiseases] = useState([]);

    // List of doctors for the dropdown
    const doctorsList = [
        { id: 1, name: 'Dr. Avani MB' },
        { id: 2, name: 'Dr. Ambika Madhavan' },
        { id: 3, name: 'Dr. Abraham Usaf' },
        { id: 4, name: 'Dr. Michael Brown' },
    ];

    // List of disease options for checkboxes
    const diseaseOptions = [
        'None', 
        'Systolic BP', 
        'Diastolic BP', 
        'BS', 
        'Body Temperature',
        'Heart rate'
    ];

    // Form submission handler
    const handleSignUp = async (e) => {
        e.preventDefault();
        
        const userData = {
            name,
            email,
            password,
            dob,
            doctor,
            expectedDelivery,
            diseases
        };
        
        console.log('User Data:', userData); // Debugging output
        
        try {
            // Send data to the server
            const response = await axios.post('http://localhost:8080/api/user/register', userData);
            console.log('Form successfully submitted:', response.data);
            navigate('/login'); // Redirect to login on success
        } catch (error) {
            console.error('Error submitting form:', error);
            // Optionally, show an error message to the user
        }
    };

    // Function to handle changes in disease checkboxes
    const handleDiseaseChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setDiseases([...diseases, value]);
        } else {
            setDiseases(diseases.filter(disease => disease !== value));
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                
                {/* Name Input */}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {/* Date of Birth Input */}
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth (DOB):</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>

                {/* Doctor Selection Dropdown */}
                <div className="form-group">
                    <label htmlFor="doctor">Select Your Doctor:</label>
                    <select
                        id="doctor"
                        className="form-select"
                        name="doctor"
                        value={doctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        required
                    >
                        <option value="">Choose a Doctor</option>
                        {doctorsList.map((doctor) => (
                            <option key={doctor.id} value={doctor.name}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Delivery Date Input */}
                <div className="form-group">
                    <label htmlFor="expectedDelivery">Expected Delivery Date:</label>
                    <input
                        type="date"
                        id="expectedDelivery"
                        value={expectedDelivery}
                        onChange={(e) => setExpectedDelivery(e.target.value)}
                        required
                    />
                </div>

                {/* Disease Selection (Checkboxes) */}
                <div className="form-group">
                    <label>Any Lifestyle Diseases:</label>
                    {diseaseOptions.map((option, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`disease-${index}`}
                                value={option}
                                onChange={handleDiseaseChange}
                                checked={diseases.includes(option)}
                            />
                            <label htmlFor={`disease-${index}`}>{option}</label>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <center><button type="submit" className="btn">Sign Up</button></center>
            </form>
        </div>
    );
};

export default SignUp;
