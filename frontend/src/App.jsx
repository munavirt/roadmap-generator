import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';

import GenerateRoadmap from './pages/GenerateRoadmap';
import ResumeAnalyzer from './pages/ResumeAnalyzer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard layout routes */}
        <Route path="/" element={<Layout />}>
          <Route path="roadmap" element={<GenerateRoadmap />} />
          <Route path="resume" element={<ResumeAnalyzer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
