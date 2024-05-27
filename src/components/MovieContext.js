import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [singleMovie, setSingleMovie] = useState([]);
  
  return (
    <MovieContext.Provider value={{ selectedMovie, singleMovie, setSelectedMovie, setSingleMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
