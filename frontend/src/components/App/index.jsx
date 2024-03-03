import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Home';
import DetailsPage from '../Details';
import Card from '../Card'
import AuthFormPage from '../AuthFormPage'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:poisId" element={<DetailsPage />} />
        <Route path="/auth/:formType" element={<AuthFormPage />} />

      </Routes>
    </div>
  );
}

export default App;
