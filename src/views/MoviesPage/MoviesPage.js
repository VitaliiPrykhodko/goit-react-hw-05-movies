import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import fetchMovies from "../../fetchMovies/fetchMovies";
import MoviesPageItem from "./MoviesPageItem";
import qs from "query-string";
import styles from "./MoviesPage.module.css";

function MoviesSearch() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    qs.parse(location.search)?.query || ""
  );

  const onChangeState = (query) => {
    setSearchQuery(query);
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeState(query);
    setQuery("");
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetchMovies("/search/movie", searchQuery)
      .then((data) => {
        if (data.length > 0) {
          return setMovies(data);
        }
        return alert("Not found");
      })
      .catch((error) => console.log(error));
  }, [searchQuery]);

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
        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>
      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => {
            return (
              <MoviesPageItem
                key={id}
                title={title}
                id={id}
                location={location}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

export default MoviesSearch;
