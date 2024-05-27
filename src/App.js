import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Popular from './components/Popular/Popular';
import TopRated from './components/TopRated/TopRated';
import Upcoming from './components/Upcoming/Upcoming';
import SearchResult from './components/SearchResult/SearchResult';
import { MovieProvider } from './components/MovieContext';
import DataDisplay from './components/DataDisplay/DataDisplay';


function App() {
  return (
    <MovieProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/DataDisplay" element={<DataDisplay />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;
