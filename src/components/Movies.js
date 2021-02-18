import React, { useEffect, useState } from "react";
import api, { token } from "../api/api";

import Card from "./Card";
import Search from "./Search";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { loadMovies } from "../store/actions/movies";
import { FETCH_POPULAR_MOVIES } from "../store/types";

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  const location = useLocation();
  const parsed = queryString.parse(location.search.toString());
  const [currentMovies, setCurrentMovies] = useState(parsed.query);
  console.log(parsed.query);

  useEffect(() => {
    if (currentMovies) {
      onSubmitHandler(currentMovies);
    } else {
      dispatch(loadMovies());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler = (term) => {
    api.get(`/search/movie?${token}&query=${term}`).then((res) => {
      dispatch({ type: FETCH_POPULAR_MOVIES, payload: res.data.results });
      setCurrentMovies(term);
    });
  };

  return (
    <section className="content-wrapper">
      <Search onSubmitHandler={onSubmitHandler} placeholder="Search a movie" />
      <div className="movies__list">
        {movies.popular &&
          movies.popular.map((movie) => (
            <Card key={movie.id} type="movie" data={movie} />
          ))}
        {/* {movies.topRated &&
          movies.topRated.map((movie) => (
            <Card key={movie.id} type="movie" data={movie} />
          ))}

        {movies.upcoming &&
          movies.upcoming.map((movie) => (
            <Card key={movie.id} type="movie" data={movie} />
          ))} */}
      </div>
    </section>
  );
};

export default Movies;
