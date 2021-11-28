import {
  useParams,
  useHistory,
  NavLink,
  useRouteMatch,
  Route,
} from "react-router-dom";
import React, { useState, useEffect, lazy, Suspense } from "react";
import fetchMovies from "../../fetchMovies/fetchMovies";
import styles from "./MovieDetailsPage.module.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const Cast = lazy(() => import("../Cast/Cast.js"));
const Reviews = lazy(() => import("../Reviews/Reviews.js"));

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { push } = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchMovies(`/movie/${movieId}`)
      .then((data) => setMovie(data))
      .catch((error) => alert("Not found"));
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          {[movie].map(({id, poster_path, title, release_date, vote_average, overview, genres}) => {
            return (
              <div className={styles.detailBox} key={id}>
                <div className={styles.thumb}>
                  <button type="button" onClick={() => push("/")}>
                    Go back
                  </button>
                  <img
                    src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                    alt={title}
                  />
                </div>
                <section className="about">
                  <h1>
                    {title} ({release_date.slice(0, 4)})
                  </h1>
                  <p>User Score: {vote_average * 10}%</p>
                  <h2>Overview</h2>
                  <p>{overview}</p>
                  <h2>Genres</h2>
                  <p>
                    {genres.map((genre, i) => {
                      const genreList = [];
                      genreList.push(genre.name);
                      return genreList[i];
                    })}
                  </p>
                </section>
              </div>
            );
          })}
          <hr />
          <div className="information">
            <h2>Additional information</h2>
            <ul>
              <li>
                <NavLink className={styles.link}  to={`${url}/cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink className={styles.link}  to={`${url}/reviews`}>Reviews</NavLink>
              </li>
            </ul>
          </div>
          <hr />
          <Suspense
            fallback={
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}
              />
            }
          >
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
