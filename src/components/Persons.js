import React, { useEffect, useState } from "react";
import api, { token } from "../api/api";

import Card from "./Card";
import Search from "./Search";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { loadPersons } from "../store/actions/persons";
import { FETCH_POPULAR_PERSONS } from "../store/types";

const Persons = () => {
  const dispatch = useDispatch();
  const persons = useSelector((state) => state.persons);

  const location = useLocation();
  const parsed = queryString.parse(location.search.toString());
  const [currentPersons, setCurrentPersons] = useState(parsed.query);
  console.log(parsed.query);

  useEffect(() => {
    if (currentPersons) {
      onSubmitHandler(currentPersons);
    } else {
      dispatch(loadPersons());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler = (term) => {
    api.get(`/search/person?${token}&query=${term}`).then((res) => {
      dispatch({ type: FETCH_POPULAR_PERSONS, payload: res.data.results });
      setCurrentPersons(term);
    });
  };

  return (
    <section className="content-wrapper">
      <Search onSubmitHandler={onSubmitHandler} placeholder="Search a person" />
      <div className="movies__list">
        {persons.popular.map((person) => (
          <Card key={person.id} type="person" data={person} />
        ))}
      </div>
    </section>
  );
};

export default Persons;
