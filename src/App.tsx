import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MoviesList from './pages/MoviesList';
import MovieDetails from './pages/MovieDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;