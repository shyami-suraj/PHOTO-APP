import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhotoList from './components/PhotoList';
import PhotoDetails from './components/PhotoDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PhotoList />} />
        <Route path="/photos/:id" element={<PhotoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;