// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DesignerPage from './components/DesignerPage';
import ShirtPreviewPage from './components/ShirtPreviewPage';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/designer" element={<DesignerPage />} />
        <Route path="/preview" element={<ShirtPreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
