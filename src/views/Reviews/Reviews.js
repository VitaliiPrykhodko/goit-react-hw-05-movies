import fetchMovies from "../../fetchMovies/fetchMovies";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Reviews() {
  const [authors, setAuthor] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    fetchMovies(`/movie/${movieId}/reviews`).then((data) =>
      setAuthor(data.results)
    ).catch(error=>console.log(error))
  },[movieId]);
  return (
    <>
      {authors.length > 0 ? (
        <ul>
          {authors.map(({ author, content, id }) => {
            return (
              <li key={id}>
                <h2>Author: {author}</h2>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      ): <h3>There are no comments</h3>}
    </>
  );
}
