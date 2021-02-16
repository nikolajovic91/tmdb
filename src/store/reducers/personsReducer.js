import { FETCH_LATEST_PERSONS, FETCH_POPULAR_PERSONS } from "../types";

const initialState = {
  popular: [],
  latest: [],
};

const personsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POPULAR_PERSONS:
      return { ...state, popular: payload };
    case FETCH_LATEST_PERSONS:
      return { ...state, topRated: payload };
    default:
      return { ...state };
  }
};

export default personsReducer;
