import api, {
  popularShows,
  latestShows,
  topRatedShows,
  showCredits,
  showDetails,
} from "../../api/api";
import {
  FETCH_LATEST_SHOWS,
  FETCH_POPULAR_SHOWS,
  FETCH_TOP_RATED_SHOWS,
  FETCH_SHOW_DETAILS,
  FETCH_SHOW_CREDITS
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

export const loadShowDetails = (id) => async (dispatch) => {
  const details = await api.get(showDetails(id));
  const credits = await api.get(showCredits(id));

  dispatch({
    type: FETCH_SHOW_DETAILS,
    payload: {
      details: details.data,
      loading: false
    }
    
  })
  dispatch({
    type: FETCH_SHOW_CREDITS,
    payload: {
      credits: credits.data,
      loading: false
    }
  })
};
