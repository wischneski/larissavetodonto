import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { VetOdontoScorePage } from './pages/VetOdontoScorePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vetodontoscore" element={<VetOdontoScorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
