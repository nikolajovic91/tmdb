import api, {
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  movieCredits,
  movieDetails
} from "../../api/api";
import {
  FETCH_POPULAR_MOVIES,
  FETCH_TOP_RATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_CREDITS,
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

export const loadMovieDetails = (id) => async (dispatch) => {
  const details = await api.get(movieDetails(id));
  const credits = await api.get(movieCredits(id));

  dispatch({
    type: FETCH_MOVIE_DETAILS,
    payload: {
      details: details.data,
      loading: false
    }
    
  })
  dispatch({
    type: FETCH_MOVIE_CREDITS,
    payload: {
      credits: credits.data,
      loading: false
    }
  })
};
