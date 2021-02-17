import {
  FETCH_LATEST_SHOWS,
  FETCH_POPULAR_SHOWS,
  FETCH_TOP_RATED_SHOWS,
  FETCH_SHOW_DETAILS,
  FETCH_SHOW_CREDITS,
  CLEAR_SHOW_DETAILS
} from "../types";

const initialState = {
  popular: [],
  latest: [],
  topRated: [],
  details: {},
  credits: {},
  loading: true,
};

const showsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POPULAR_SHOWS:
      return { ...state, popular: payload };
    case FETCH_TOP_RATED_SHOWS:
      return { ...state, topRated: payload };
    case FETCH_LATEST_SHOWS:
      return { ...state, latest: payload };
    case FETCH_SHOW_DETAILS:
      return { ...state, details: payload.details, loading: payload.loading };
    case CLEAR_SHOW_DETAILS:
      return { ...state, details: {}, loading: true};
    case FETCH_SHOW_CREDITS:
      return { ...state, credits: payload.credits };
    default:
      return { ...state };
  }
};

export default showsReducer;
