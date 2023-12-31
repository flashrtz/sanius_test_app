import axios from "../config/axiosInstance";
import { TMDB_API_KEY } from "../config/constants";
const apiKey = TMDB_API_KEY;

export const searchMovie = async ({ searchInput }) => {
  try {
    const searchMovieRes = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`
    );
    return searchMovieRes;
  } catch (err) {
    throw err;
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const searchMovieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    );
    return searchMovieRes;
  } catch (err) {
    throw err;
  }
};

export const getPopularMovies = async () => {
  try {
    const searchMovieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc`
    );
    return searchMovieRes;
  } catch (err) {
    throw err;
  }
};

export const getTopRatedMovies = async () => {
  try {
    const searchMovieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`
    );
    return searchMovieRes;
  } catch (err) {
    throw err;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const searchMovieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`
    );
    return searchMovieRes;
  } catch (err) {
    throw err;
  }
};

export const getMovieById = async (id) => {
  try {
    const resMovie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    );
    return resMovie;
  } catch (err) {
    throw err;
  }
};
