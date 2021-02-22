import React, { useEffect, useState } from "react";
import api, { token } from "../api/api";

import Card from "./Card";
import Search from "./Search";

import { useSelector, useDispatch } from "react-redux";
import { loadShows } from "../store/actions/shows";
import { FETCH_SEARCHED_SHOWS } from "../store/types";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const Shows = () => {
  const dispatch = useDispatch();
  const shows = useSelector((state) => state.tv);

  const location = useLocation();
  const parsed = queryString.parse(location.search.toString());
  const [currentShows, setCurrentShows] = useState(parsed.query);
  console.log(parsed.query);
  const onSubmitHandler = (term) => {
    api.get(`/search/tv?${token}&query=${term}`).then((res) => {
      dispatch({ type: FETCH_SEARCHED_SHOWS, payload: res.data.results });
      setCurrentShows(term);
    });
  };

  useEffect(() => {
    if (currentShows) {
      onSubmitHandler(currentShows);
    } else {
      dispatch(loadShows());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="content-wrapper">
      <Search
        onSubmitHandler={onSubmitHandler}
        placeholder="Search a tv show"
      />
      <div className="movies__list">
        {shows.searched.map((show) => (
          <Card key={show.id} type="show" data={show} query={currentShows} />
        ))}
      </div>
      <div className="movies__list">
        {shows.popular.map((show) => (
          <Card key={show.id} type="show" data={show} query={currentShows} />
        ))}

        {/* {shows.topRated.map((show) => (
          <Card key={show.id} type="show" data={show} />
        ))} */}
      </div>
    </section>
  );
};

export default Shows;
