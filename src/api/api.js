import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: "ced15ba83f3ec26f1efe11a561f1a6cf",
  },
});

export const token = 'api_key=ced15ba83f3ec26f1efe11a561f1a6cf'

export const popularMovies = () => `/movie/popular?${token}`
export const topRatedMovies = () => `/movie/top_rated?${token}`
export const upcomingMovies = () => `/movie/upcoming?${token}`

export const popularShows = () => `/tv/popular?${token}`
export const topRatedShows = () => `/tv/top_rated?${token}`
export const latestShows = () => `/tv/latest?${token}`

export const popularPersons = () => `/person/popular?${token}`
