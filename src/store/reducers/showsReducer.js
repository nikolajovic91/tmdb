import {
  FETCH_LATEST_SHOWS,
  FETCH_POPULAR_SHOWS,
  FETCH_TOP_RATED_SHOWS,
} from "../types";

const initialState = {
  popular: [],
  latest: [],
  topRated: [],
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
    default:
      return { ...state };
  }
};

export default showsReducer;
