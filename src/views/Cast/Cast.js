import fetchMovies from "../../fetchMovies/fetchMovies";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Cast.module.css";

export default function Cast() {
  const [actors, setActors] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    fetchMovies(`/movie/${movieId}/credits`).then((data) =>
      setActors(data.cast)
    );
  }, [movieId]);

  return (
    <>
      {actors && (
        <ul>
          {actors.map(({ profile_path, name, id, character }) => {
            return (
              <li className={styles.item} key={id}>
                <img
                  className={styles.imdActor}
                  src={`https://image.tmdb.org/t/p/w342${profile_path}`}
                  alt={name}
                />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
