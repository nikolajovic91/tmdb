import api, {
  popularMovies,
  topRatedMovies,
  upcomingMovies,
} from "../../api/api";
import {
  FETCH_POPULAR_MOVIES,
  FETCH_TOP_RATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
} from "../types";

export const loadMovies = () => async (dispatch) => {
  const popular = await api.get(popularMovies());
  const topRated = await api.get(topRatedMovies());

  const upcoming = await api.get(upcomingMovies());
  dispatch({
    type: FETCH_POPULAR_MOVIES,
    payload: popular.data.results,
  });
  dispatch({
    type: FETCH_TOP_RATED_MOVIES,
    payload: topRated.data.results,
  });
  dispatch({
    type: FETCH_UPCOMING_MOVIES,
    payload: upcoming.data.results,
  });
};
