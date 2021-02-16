import React, { useState, useEffect } from "react";
import api, { token } from "../api/api";
import Card from "./Card";
import Search from "./Search";

const Persons = () => {
  const [results, setResults] = useState([]);
  const getResult = async () => {
    const response = await api.get(`/person/popular?${token}`);
    setResults(response.data.results);
  };

  useEffect(() => {
    getResult();
  }, []);


  const onSubmitHandler = (term) => {
    api.get(`/search/person?${token}&query=${term}`).then(res => setResults(res.data.results))
  };
  
  return (
    <section className='content-wrapper'>
        <Search onSubmitHandler={onSubmitHandler}/>
      <div className="movies__list">
        {results.map((person) => (
          <Card key={person.id} type="person" data={person} />
        ))}
      </div>
    </section>
  );
};

export default Persons;
