import React, { useState, useEffect } from "react";
import api, { token } from "../api/api";
import Card from "./Card";
import Search from "./Search";

const Movies = () => {
  const [results, setResults] = useState([]);
  const getResult = async () => {
    const response = await api.get(`/movie/popular?${token}`);
    setResults(response.data.results);
  };

  useEffect(() => {
    getResult();
  }, []);


  const onSubmitHandler = (term) => {
    api.get(`/search/movie?${token}&query=${term}`).then(res => setResults(res.data.results))
  };
  
  return (
    <section className='content-wrapper'>
        <Search onSubmitHandler={onSubmitHandler}/>
      <div className="movies__list">
        {results.map((movie) => (
          <Card key={movie.id} type="movie" data={movie} />
        ))}
      </div>
    </section>
  );
};

export default Movies;
