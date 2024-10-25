import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Body from './Body.jsx';
import Healthmetrics from './Healthmetrics.jsx';
import VideoCall from './VideoCall';
import Navbar from '../admin/Navbar.jsx'
import Prediction from './Prediction.jsx';
export default function SomeOtherComponent() {
  return (
    <div>
        <Navbar/>
    <Routes>
      <Route path='/home' element={<Body />} />
      <Route path='/healthmetrics' element={<Healthmetrics />} />
      <Route path='/vcall' element={<VideoCall />} />
      <Route path='/prediction' element={<Prediction />} />
      {/* Add more routes as needed */}
    </Routes>
    </div>
  );
}