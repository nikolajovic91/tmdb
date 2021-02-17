import {
  FETCH_POPULAR_MOVIES,
  FETCH_TOP_RATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
  FETCH_MOVIE_CREDITS,
  FETCH_MOVIE_DETAILS,
  CLEAR_MOVIE_DETAILS,
} from "../types";

const initialState = {
  popular: [],
  topRated: [],
  upcoming: [],
  details: {},
  credits: {},
  loading: true,
};

const movieReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POPULAR_MOVIES:
      return { ...state, popular: payload };
    case FETCH_TOP_RATED_MOVIES:
      return { ...state, topRated: payload };
    case FETCH_UPCOMING_MOVIES:
      return { ...state, upcoming: payload };
    case FETCH_MOVIE_DETAILS:
      return { ...state, details: payload.details, loading: payload.loading };
    case CLEAR_MOVIE_DETAILS:
      return { ...state, details: {}, loading: true };
    case FETCH_MOVIE_CREDITS:
      return { ...state, credits: payload.credits };
    default:
      return { ...state };
  }
};

export default movieReducer;
