import Navigation from "./Navigation/Navigation";
import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomePage = lazy(() => import('./views/HomePage/HomePage.js'))
const MoviesSearch = lazy(() => import('./views/MoviesPage/MoviesPage'))
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage/MovieDetailsPage.js'))

function App() {
  return (
    <div className="container">
      <header className="header-page">
        <Navigation />
      </header>
      <hr />
      <Suspense fallback={<Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />}>
        <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies" exact>
          <MoviesSearch />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
      </Switch>
      </Suspense>
    </div>
  );
}

export default App;
