import {
  FETCH_POPULAR_MOVIES,
  FETCH_TOP_RATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
} from "../types";

const initialState = {
  popular: [],
  topRated: [],
  upcoming: []
};

const movieReducer = (state = initialState, action) => {
    const {type, payload} = action
  switch (type) {
    case FETCH_POPULAR_MOVIES:
      return { ...state, popular: payload };
    case FETCH_TOP_RATED_MOVIES:
      return { ...state, topRated: payload };
    case FETCH_UPCOMING_MOVIES:
      return { ...state, upcoming: payload };
    default:
      return { ...state };
  }
};

export default movieReducer;
