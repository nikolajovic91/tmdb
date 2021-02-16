import React, { useState, useEffect } from "react";
import api, { token } from "../api/api";
import Card from "./Card";
import Search from "./Search";

const Shows = () => {
  const [results, setResults] = useState([]);
  const getResult = async () => {
    const response = await api.get(`/tv/popular?${token}`);
    setResults(response.data.results);
    console.log(response.data.results);
  };

  const onSubmitHandler = (term) => {
    api.get(`/search/tv?${token}&query=${term}`).then(res => setResults(res.data.results))
  };
  

  useEffect(() => {
    getResult();
  }, []);
  return (
    <section className='content-wrapper'>
        <Search onSubmitHandler={onSubmitHandler} />
        <div className="movies__list">
      {results.map((show) => (
        <Card key={show.id} type='show' data={show} />
      ))}
    </div>
    </section>
  );
};

export default Shows;
