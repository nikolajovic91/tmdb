import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState, useEffect } from "react";
import api, { token } from "../api/api";
import Card from "./Card";
import Search from "./Search";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import { loadMovies } from "../store/actions/movies";
import { loadShows } from "../store/actions/shows";
import { loadPersons } from "../store/actions/persons";

import {
  FETCH_POPULAR_PERSONS,
  FETCH_POPULAR_MOVIES,
  FETCH_POPULAR_SHOWS,
} from "../store/types";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadMovies());
    dispatch(loadShows());
    dispatch(loadPersons());
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [dispatch]);

  const onSubmitHandler = async (term) => {
    const response = await api.get(`/search/multi?${token}&query=${term}`);
    let pers = [];
    let tv = [];
    let films = [];

    // NADJI NEKO BOLJE RESENJE, VIDI KAO ONI STO SU NAPRAVILI NOVU STRANU I NA NJU IMAS LEVO
    // REZULTATE PO KATEGORIJI I DESNO PRETRAGU ZA TU KATEGORIJU
    response.data.results.map((res) => {
      if (res.media_type === "person") {
        pers.push(res);
        return dispatch({ type: FETCH_POPULAR_PERSONS, payload: pers });
      } else if (res.media_type === "tv") {
        tv.push(res);
        return dispatch({ type: FETCH_POPULAR_SHOWS, payload: tv });
      } else {
        films.push(res);
        return dispatch({ type: FETCH_POPULAR_MOVIES, payload: films });
      }
    });
  };

  return (
    <section className="content-wrapper">
      <Search
        onSubmitHandler={onSubmitHandler}
        placeholder="Search a movie, tv show or person"
      />
      {!loading && state.movies ? (
        <div>
          <motion.h3 animate={{ opacity:1 }} initial={{ opacity: 0 }}>Movies</motion.h3>
          <motion.div
            className="movies__list"
            initial={{ opacity: 0, x: '100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'tween', delay: 0.3, duration:0.3 }}
          >
            {state.movies &&
              state.movies.popular
                .slice(0, 8)
                .map((movie) => (
                  <Card key={movie.id} type="movie" data={movie} />
                ))}
          </motion.div>
          <motion.h3 animate={{ opacity:1 }} initial={{ opacity: 0 }}>Shows</motion.h3>
          <motion.div className="movies__list"
           initial={{ x: "-100vw" }} animate={{ x: 0 }}
           transition={{ type: 'tween', delay: 0.6, duration:0.3 }}
          >
            {state.tv &&
              state.tv.popular
                .slice(0, 8)
                .map((show) => <Card key={show.id} type="show" data={show} />)}
          </motion.div>
          <h3>Persons</h3>
          <div className="movies__list">
            {state.persons &&
              state.persons.popular
                .slice(0, 8)
                .map((person) => (
                  <Card key={person.id} type="person" data={person} />
                ))}
          </div>
        </div>
      ) : (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </section>
  );
};

export default Home;
