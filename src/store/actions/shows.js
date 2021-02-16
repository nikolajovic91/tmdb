import api, { popularShows, latestShows, topRatedShows } from "../../api/api";
import {
  FETCH_LATEST_SHOWS,
  FETCH_POPULAR_SHOWS,
  FETCH_TOP_RATED_SHOWS,
} from "../types";

export const loadShows = () => async (dispatch) => {
  const popular = await api.get(popularShows());
  const topRated = await api.get(topRatedShows());
  const latest = await api.get(latestShows());
  dispatch({
    type: FETCH_POPULAR_SHOWS,
    payload: popular.data.results,
  });
  dispatch({
    type: FETCH_TOP_RATED_SHOWS,
    payload: topRated.data.results,
  });
  dispatch({
    type: FETCH_LATEST_SHOWS,
    payload: [latest.data],
  });
};
