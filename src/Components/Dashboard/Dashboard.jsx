import React from 'react';
import Healthmetrics from './Healthmetrics';
import { Route, Routes } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <Routes>
        <Route path='/health' element={<Healthmetrics />} />
      </Routes>
    </div>
  );
}