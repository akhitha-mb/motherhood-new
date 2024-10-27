// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dlogin = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const { email, password } = formData;

//     // Handle input change
//     const onChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle form submission
//     const onSubmit = async (e) => {
//         e.preventDefault();
//         setError(null); // Reset error before login attempt

//         try {
//             const response = await axios.post("http://localhost:8080/api/doctor/dlogin", formData);

//             if (response.data.success) {
//                 // Assuming token and userid are returned upon successful login
//                 sessionStorage.setItem('token', response.data.token);
//                 sessionStorage.setItem('userid', response.data.userid);
//                 alert('Login successful!');

//                 // Redirect to the doctordash page
//                 navigate('/doctordash'); 
//             } else {
//                 setError(response.data.message || 'Login failed. Please try again.');
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             setError('An error occurred. Please check your network or try again later.');
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100">
//             <div className="container">
//                 <h2 className="text-center mb-4">Doctor Login</h2>
//                 <form onSubmit={onSubmit} className="col-12 col-sm-8 col-md-6 col-lg-5 mx-auto">
//                     {error && <div className="alert alert-danger text-center">{error}</div>}
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             name="email"
//                             value={email}
//                             onChange={onChange}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             name="password"
//                             value={password}
//                             onChange={onChange}
//                             required
//                         />
//                     </div>
//                     <div className="d-flex justify-content-center">
//                         <button type="submit" className="btn btn-success">Log In</button>
//                     </div>
//                 </form>
//                 <div className="col-12 text-center mt-4">
//                     <h6>Don't have an account?</h6>
//                     <Link to="/dSignup" className="btn btn-primary">Create an Account</Link>
//                 </div>
//                 <Link to="/doctordash" style={{
//                     position: 'absolute',
//                     top: '20px',
//                     left: '20px',
//                     color: 'black',
//                     textDecoration: 'none',
//                     fontWeight: 'bold',
//                 }}></Link>
//             </div>
//         </div>
//     );
// };

// export default Dlogin;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dlogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { email, password } = formData;

    // Handle input change
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before login attempt

        try {
            const response = await axios.post("http://localhost:8080/api/doctor/dlogin", formData);

            if (response.data.success) {
                // Assuming token, userid, and doctorName are returned upon successful login
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('userid', response.data.userid);
                
                // Save doctorName in localStorage
                localStorage.setItem('doctorName', response.data.doctorName);

                alert('Login successful!');

                // Redirect to the doctordash page
                navigate('/doctordash'); 
            } else {
                setError(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please check your network or try again later.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container">
                <h2 className="text-center mb-4">Doctor Login</h2>
                <form onSubmit={onSubmit} className="col-12 col-sm-8 col-md-6 col-lg-5 mx-auto">
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
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
                    <h6>Don't have an account?</h6>
                    <Link to="/dSignup" className="btn btn-primary">Create an Account</Link>
                </div>
                <Link to="/doctordash" style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    color: 'black',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                }}>Go to Dashboard</Link>
            </div>
        </div>
    );
};

export default Dlogin;
