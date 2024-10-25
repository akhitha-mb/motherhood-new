import React, { useState } from 'react';
import axios from 'axios';

const HealthMetricsForm = () => {
    const [formData, setFormData] = useState({
        systolicBP: '',
        diastolicBP: '',
        bloodSugar: '',
        heartRate: '',
        bodyTemperature: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { systolicBP, diastolicBP, bloodSugar, heartRate, bodyTemperature } = formData;

    // Handle input change
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state
        setSuccess(''); // Reset success state

        // Retrieve token from local storage or state
        const token = localStorage.getItem('token'); // Adjust based on your token storage mechanism

        try {
            const response = await axios.post('http://localhost:8080/api/health/add', { ...formData, token });
            setSuccess(response.data.message); // Set success message
        } catch (err) {
            console.error('Error submitting health metrics:', err);
            setError(err.response?.data?.error || 'An error occurred while submitting the form.');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mb-4">Health Metrics</h2>
            <form onSubmit={onSubmit} className="col-12 col-sm-8 col-md-6 mx-auto">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                
                <div className="mb-3">
                    <label htmlFor="systolicBP" className="form-label">Systolic BP</label>
                    <input
                        type="number"
                        className="form-control"
                        name="systolicBP"
                        value={systolicBP}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="diastolicBP" className="form-label">Diastolic BP</label>
                    <input
                        type="number"
                        className="form-control"
                        name="diastolicBP"
                        value={diastolicBP}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bloodSugar" className="form-label">Blood Sugar</label>
                    <input
                        type="number"
                        className="form-control"
                        name="bloodSugar"
                        value={bloodSugar}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="heartRate" className="form-label">Heart Rate</label>
                    <input
                        type="number"
                        className="form-control"
                        name="heartRate"
                        value={heartRate}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bodyTemperature" className="form-label">Body Temperature</label>
                    <input
                        type="number"
                        className="form-control"
                        name="bodyTemperature"
                        value={bodyTemperature}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default HealthMetricsForm;