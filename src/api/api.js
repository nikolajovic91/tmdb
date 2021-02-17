import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

export const token = `api_key=${process.env.REACT_APP_API_KEY_TMDB}`;

export const popularMovies = () => `/movie/popular?${token}`;
export const topRatedMovies = () => `/movie/top_rated?${token}`;
export const upcomingMovies = () => `/movie/upcoming?${token}`;

export const popularShows = () => `/tv/popular?${token}`;
export const topRatedShows = () => `/tv/top_rated?${token}`;
export const latestShows = () => `/tv/latest?${token}`;

export const popularPersons = () => `/person/popular?${token}`;

export const showDetails = (id) => `/tv/${id}?${token}`;
export const showCredits = (id) => `/tv/${id}/credits?${token}`;

export const movieDetails = (id) => `/movie/${id}?${token}`;
export const movieCredits = (id) => `/movie/${id}/credits?${token}`;

export const personDetails = (id) => `/person/${id}?${token}`
export const personMovieCredits = id =>`/person/${id}/movie_credits?${token}`
export const personTvCredits = id => `/person/${id}/tv_credits?${token}`
