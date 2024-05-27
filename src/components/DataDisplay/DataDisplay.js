import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../MovieContext";
import Axios from "axios";
import "./DataDisplay.css";

const DataDisplay = () => {
  const { singleMovie } = useContext(MovieContext);
  console.log("singleMovie", singleMovie);

  const [movieOne, setMovieOne] = useState({});
  const [movieCastOne, setMovieCastOne] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://api.themoviedb.org/3/movie/${singleMovie.id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
    )
      .then((res) => {
        setMovieOne(res.data);
        console.log("jay ", res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    Axios.get(
      `https://api.themoviedb.org/3/movie/${singleMovie.id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
    )
      .then((res) => {
        setMovieCastOne(res.data.cast);
        console.log("mike", res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [singleMovie.id]);

  return (
    <div className="data-display-contain">
      <div className="data-display-container">
        <div
          className="movie-item-on"
          style={{
            backgroundImage: movieOne.backdrop_path
              ? `url('https://image.tmdb.org/t/p/w500${movieOne.backdrop_path}')`
              : "none",
          }}
        >
          <div className="movie-itemtwo">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieOne.poster_path}`}
              width="100px"
              height="155px"
              alt={movieOne.title}
            />
            <div className="main">
              <div style={{ color: "aliceblue" }}>
                <h3 style={{ marginTop: "0" }}>{movieOne.title}</h3>
                <p>
                  Rating:{" "}
                  {movieOne.vote_average
                    ? movieOne.vote_average.toFixed(1)
                    : "N/A"}
                </p>
                <div className="runtime">
                  <div className="runtimeBox">{movieOne.runtime} Min</div>

                  <div className="runtimegen">
                    {movieOne?.genres?.map((gen, index) => (
                      <span key={gen.id} style={{ color: "aliceblue" }}>
                        {gen.name}
                        {index !== movieOne.genres.length - 1 && ","}{" "}
                      </span>
                    ))}
                  </div>
                </div>

                <p>
                  Release date:{" "}
                  {new Date(movieOne.release_date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
          <h3 style={{ color: "aliceblue" }}>Overview</h3>
          <p style={{ width: "50%", color: "aliceblue" }}>
            {movieOne.overview}
          </p>
        </div>
      </div>
      <h1 className="cast-movie" style={{ color: "aliceblue" }}>
        Cast
      </h1>
      <div className="data-display-containers">
        {movieCastOne?.map((info) => (
          <div key={info.id} className="movie-item-ele">
            <img
              src={`https://image.tmdb.org/t/p/w500${info.profile_path}`}
              width="100px"
              height="150px"
              alt={info.original_name}
            />
            <p style={{ color: "aliceblue" }}>{info.original_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;
