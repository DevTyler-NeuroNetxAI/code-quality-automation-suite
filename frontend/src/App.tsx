/**
 * App.tsx
 * Generated for: Code Quality Automation Suite
 * Generated at: 2025-08-14T18:44:31.477Z
 * Auto Project Maker - Enterprise Code Generator
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Additional routes will be added based on features */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
