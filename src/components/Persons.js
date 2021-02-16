import React, { useEffect } from "react";
import api, { token } from "../api/api";

import Card from "./Card";
import Search from "./Search";

import { useSelector, useDispatch } from "react-redux";
import { loadPersons } from "../store/actions/persons";
import { FETCH_POPULAR_PERSONS } from "../store/types";

const Persons = () => {
  const dispatch = useDispatch();
  const persons = useSelector((state) => state.persons);

  useEffect(() => {
    dispatch(loadPersons());
  }, []);

  const onSubmitHandler = (term) => {
    api
      .get(`/search/person?${token}&query=${term}`)
      .then((res) =>
        dispatch({ type: FETCH_POPULAR_PERSONS, payload: res.data.results })
      );
  };

  return (
    <section className="content-wrapper">
      <Search onSubmitHandler={onSubmitHandler} />
      <div className="movies__list">
        {persons.popular.map((person) => (
          <Card key={person.id} type="person" data={person} />
        ))}
      </div>
    </section>
  );
};

export default Persons;
