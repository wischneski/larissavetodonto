import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load pages para code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const VetOdontoScorePage = lazy(() => import('./pages/VetOdontoScorePage').then(m => ({ default: m.VetOdontoScorePage })));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));

// Loading fallback minimalista
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-50">
    <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vetodontoscore" element={<VetOdontoScorePage />} />
          <Route path="/obrigado" element={<ThankYouPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
