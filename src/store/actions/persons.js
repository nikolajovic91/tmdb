import api, {
  popularPersons,
  personDetails,
  personMovieCredits,
  personTvCredits,
} from "../../api/api";
import {
  FETCH_POPULAR_PERSONS,
  FETCH_PERSON_DETAILS,
  FETCH_PERSON_TV_CREDIT,
  FETCH_PERSON_MOVIE_CREDIT,
} from "../types";

export const loadPersons = () => async (dispatch) => {
  const popular = await api.get(popularPersons());

  dispatch({
    type: FETCH_POPULAR_PERSONS,
    payload: popular.data.results,
  });
};

export const loadPersonDetails = (id) => async (dispatch) => {
  const details = await api.get(personDetails(id));
  const showCredits = await api.get(personTvCredits(id));
  const filmCredits = await api.get(personMovieCredits(id));

  dispatch({
    type: FETCH_PERSON_DETAILS,
    payload: {
      details: details.data,
      loading: false
    },
  });

  dispatch({
    type: FETCH_PERSON_MOVIE_CREDIT,
    payload: {
      movieCredits: filmCredits.data,
    },
  });

  dispatch({
    type: FETCH_PERSON_TV_CREDIT,
    payload: {
      tvCredits: showCredits.data,
    },
  });
};
