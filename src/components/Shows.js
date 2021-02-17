import React, { useEffect } from "react";
import api, { token } from "../api/api";

import Card from "./Card";
import Search from "./Search";

import { useSelector, useDispatch } from "react-redux";
import { loadShows } from "../store/actions/shows";
import { FETCH_POPULAR_SHOWS } from "../store/types";

const Shows = () => {
  const dispatch = useDispatch();
  const shows = useSelector((state) => state.tv);

  const onSubmitHandler = (term) => {
    api
      .get(`/search/tv?${token}&query=${term}`)
      .then((res) =>
        dispatch({ type: FETCH_POPULAR_SHOWS, payload: res.data.results })
      );
  };

  useEffect(() => {
    dispatch(loadShows());
  }, [dispatch]);

  return (
    <section className="content-wrapper">
      <Search onSubmitHandler={onSubmitHandler} placeholder="Search a tv show" />
      <div className="movies__list">
        {shows.popular.map((show) => (
          <Card key={show.id} type="show" data={show} />
        ))}

        {/* {shows.topRated.map((show) => (
          <Card key={show.id} type="show" data={show} />
        ))} */}
      </div>
    </section>
  );
};

export default Shows;
