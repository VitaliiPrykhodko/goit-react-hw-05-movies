import { useState } from "react";
import fetchMovies from "../../fetchMovies/fetchMovies";
import MoviesPageItem from "./MoviesPageItem";
import styles from "./MoviesPage.module.css"


function MoviesSearch() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMovies([]);
    if (query === "") {
      alert("Please enter correct query");
      return;
    }
    fetchMovies("/search/movie", query)
      .then((data) => {
        if (data.length > 0) {
          return setMovies(data);
        }
        return alert("Not found");
      })
      .catch((error) => console.log(error));
    setQuery("");
  }

  function handleChange(e) {
    const { value } = e.target;
    setQuery(value.trim());
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          onChange={handleChange}
          type="text"
          autoComplete="on"
          autoFocus
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          placeholder="Search movies"
          name="query"
          value={query}
        />
        <button className={styles.btn} type="submit">Search</button>
      </form>
      {movies.length > 0 && (
        <ul>
                  {movies.map(({ id, title }) => {
            return <MoviesPageItem key={id} title={title} id={id} />;
          })}
        </ul>
      )}
    </>
  );
}

export default MoviesSearch;
