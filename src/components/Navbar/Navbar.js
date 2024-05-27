import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Axios from 'axios';
import { MovieContext } from '../MovieContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setSelectedMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  const onSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      Axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=1`
      ).then((res) => {
        setSelectedMovie(res.data.results);
        console.log("Search results: ", res.data.results);
        navigate('/search-result');
      }).catch((error) => {
        console.error("Error fetching data: ", error);
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/popular">Popular</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>
        </div>
        <div className="navbar-center">
          MovieDb
        </div>
        <div className="navbar-right">
          <input
            type="text"
            value={searchQuery}
            onChange={onSearch}
            placeholder="Movie Name..."
          />
          <button className='button' onClick={() => onSearch({ target: { value: searchQuery } })}>
            Search
          </button>
        </div>
      </nav>
      <div style={{ position: "absolute", height: "200px" }}></div>
    </>
  );
};

export default Navbar;
