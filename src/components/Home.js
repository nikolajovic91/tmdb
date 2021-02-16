import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState, useEffect } from "react";
import api, { token } from "../api/api";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [persons, setPersons] = useState([]);
  const getResult = async () => {
    const m = await api.get(`/movie/popular?${token}`);
    const t = await api.get(`/tv/popular?${token}`);
    const p = await api.get(`/person/popular?${token}`);
    setMovies(m.data.results);
    setShows(t.data.results);
    setPersons(p.data.results);
  };

  useEffect(() => {
    getResult();
    setLoading(false)
  }, []);

  const onSubmitHandler = async (term) => {
    const response = await api.get(`/search/multi?${token}&query=${term}`);
    let pers = [];
    let tv = [];
    let films = [];
    response.data.results.map((res) => {
      if (res.media_type === "person") {
        return pers.push(res);
      } else if (res.media_type === "tv") {
        return tv.push(res);
      } else {
        return films.push(res);
      }
    });
    setPersons(pers);
    setShows(tv);
    setMovies(films);
    
  };

  return (
    <section className='content-wrapper'>
      <Search onSubmitHandler={onSubmitHandler} />
      {!loading ? <div>
      <h3>Movies</h3>
      <div className="movies__list">
        {movies.map((movie) => (
          <Card key={movie.id} type="movie" data={movie} />
        ))}
      </div>
      <h3>Shows</h3>
      <div className="movies__list">
        {shows.map((show) => (
          <Card key={show.id} type="show" data={show} />
        ))}
      </div>
      <h3>Persons</h3>
      <div className="movies__list">
        {persons.map((person) => (
          <Card key={person.id} type="person" data={person} />
        ))}
      </div>
      </div>: <div className="loader">
          <CircularProgress />
        </div>}
    </section>
  );
};

export default Home;
