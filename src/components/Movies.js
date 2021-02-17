import React, { useEffect } from "react";
import api, { token } from "../api/api";

import Card from "./Card";
import Search from "./Search";

import { useSelector, useDispatch } from "react-redux";
import { loadMovies } from "../store/actions/movies";
import {FETCH_POPULAR_MOVIES} from '../store/types'


const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(loadMovies());
  }, [dispatch]);

  const onSubmitHandler = (term) => {
    api
      .get(`/search/movie?${token}&query=${term}`)
      .then((res) => dispatch({type: FETCH_POPULAR_MOVIES, payload: res.data.results}));
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
