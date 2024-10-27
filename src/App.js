import React from 'react';
import logo from './logo.svg';
import './App.css';
import LogIn from './Components/LogIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import { Home } from './Components/Home';
import Doctorsignup from './Components/Doctorsignup';

import PatientDash from './Components/admin/PatientDash';
import Dlogin from './Components/Dlogin.jsx';
import Doctordash from './Components/Doctordash.jsx';
// import Navbar from './Components/admin/Navbar'

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> Place Navbar here if it's common across routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/dlogin' element={<Dlogin/>} />
    
        <Route path='/dSignup' element={<Doctorsignup/>} />
        <Route path='/patientdashboard/*' element={<PatientDash />} /> {/* Use /* for nested routes */}
        <Route path='/doctordash/*' element={<Doctordash />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;