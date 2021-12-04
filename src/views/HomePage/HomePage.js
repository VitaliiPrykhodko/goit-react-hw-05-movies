import fetchMovies from "../../fetchMovies/fetchMovies";
import React, { useState, useEffect } from "react";
import MoviesItem from "../MoviesItem/MoviesItem";
import { useLocation } from 'react-router';

function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
   const location = useLocation();

  useEffect(() => {
    fetchMovies("/trending/movies/day").then((data) => setTrendMovies(data.results));
  }, []);

  return (
    <ul>
      {trendMovies.map(({ id, title, name }) => {
        return <MoviesItem key={id} id= {id} title={title || name} location={location} />;
      })}
    </ul>
  );
}

export default HomePage;
