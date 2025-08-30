import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Randomizor from './components/Randomizor';
import EndPage from './components/EndPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Randomizor />} />
        <Route path="/end" element={<EndPage />} />
      </Routes>
    </div>
  );
}

export default App;
