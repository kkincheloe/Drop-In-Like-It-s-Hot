import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Home';
import DetailsPage from '../Details';
import Card from '../Card'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:poiId" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
