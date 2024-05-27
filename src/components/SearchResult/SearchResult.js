import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../MovieContext';
import './SearchResult.css';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const SearchResult = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setSelectedMovie, setSingleMovie, selectedMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    Axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`
    )
    .then((res) => {
      setSelectedMovie(res.data.results);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
  };

  const onMovie = (info) => {
    setSelectedMovie(info);
    setSingleMovie(info);
    navigate('/DataDisplay');
  };

  if (!Array.isArray(selectedMovie) || selectedMovie.length === 0) {
    return <div>No search results found</div>;
  }

  return (
    <div className="search-result-container">
      {selectedMovie.map((movie) => (
        <div key={movie.id} className="movie-item" onClick={() => onMovie(movie)}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width="100px"
            height="150px"
            alt={movie.title}
          />
          <p>{movie.title}</p>
          <p>Rating {movie.vote_average.toFixed(1)}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
