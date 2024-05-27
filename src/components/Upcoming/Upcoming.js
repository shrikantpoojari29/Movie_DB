import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import './Upcoming.css';
import { useNavigate } from "react-router-dom";
import { MovieContext } from '../MovieContext';
import CustomPagination from '../CustomPagination';

const Upcoming = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setSelectedMovie, setSingleMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    Axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`
    )
    .then((res) => {
      setData(res.data.results);
      setTotalPages(res.data.total_pages);
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

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <div className="upcoming-container">
      {data.map((info) => (
        <div key={info.id} className="movie-item-six" onClick={() => onMovie(info)}>
          <img
            src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
            width="100px"
            height="150px"
            alt={info.title}
          />
          <p>{info.title}</p>
          <p>Rating {info.vote_average.toFixed(1)}</p>
        </div>
      ))}
    </div>
    
    <CustomPagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={onPageChange}
  /></>
  );
};

export default Upcoming;
