import {
  FETCH_LATEST_PERSONS,
  FETCH_PERSON_DETAILS,
  FETCH_POPULAR_PERSONS,
  FETCH_PERSON_MOVIE_CREDIT,
  FETCH_PERSON_TV_CREDIT,
  CLEAR_PERSON_DETAILS,
} from "../types";

const initialState = {
  popular: [],
  latest: [],
  loading: true,
  details: {},
  tvCredits: [],
  movieCredits: [],
};

const personsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_PERSON_DETAILS:
      return { ...state, details: {}, loading: true };
    case FETCH_POPULAR_PERSONS:
      return { ...state, popular: payload };
    case FETCH_LATEST_PERSONS:
      return { ...state, topRated: payload };
    case FETCH_PERSON_DETAILS:
      return { ...state, details: payload.details, loading: payload.loading };
    case FETCH_PERSON_TV_CREDIT:
      return { ...state, tvCredits: payload.tvCredits };
    case FETCH_PERSON_MOVIE_CREDIT:
      return { ...state, movieCredits: payload.movieCredits };
    default:
      return { ...state };
  }
};

export default personsReducer;
