import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Card from "./Card";
import { CLEAR_MOVIE_DETAILS } from "../store/types";
import { loadMovieDetails } from "../store/actions/movies";
import { dateFormat, minsToHrs } from "../helpers/convertDate";
import imdb from "../assets/img/imdb.png";
const MovieDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { details, credits, loading } = useSelector((state) => state.movies);

  const poster = details.poster_path
    ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${details.poster_path}`
    : "https://previews.123rf.com/images/apoev/apoev1806/apoev180600131/103284724-default-placeholder-businessman-half-length-portrait-photo-avatar-man-gray-color.jpg";

  const backImg = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path}`;
  useEffect(() => {
    dispatch(loadMovieDetails(id));
    return () => dispatch({ type: CLEAR_MOVIE_DETAILS });
  }, [id, dispatch]);

  return (
    <div>
      {!loading ? (
        <section className="movie">
          <section
            className="movie__info"
            style={{
              backgroundImage: `linear-gradient(
                rgba(40, 40,40, 0.8), 
                rgba(40, 40, 40, 0.8)
                ), url(${backImg})`,
            }}
          >
            <div className="movie__info--image">
              <img src={poster} alt="" />
            </div>
            <div className="movie__info--text">
              <h1 className="movie__info--title">{details.title}</h1>
              <p className="movie__info--genre">
                <span>{new Date(details.release_date).toLocaleString(
                  "en-Us",
                  dateFormat
                )}</span>
                <span>
                  {details.genres &&
                    details.genres.map((genre) => genre.name + " ")}
                </span>
                <span>{minsToHrs(details.runtime)}</span>
              </p>

              <p className="movie__info--tagline">{details.tagline}</p>
              <div className="movie__info--biography">
                <h4>Overview</h4>
                <a
                  href={`https://www.imdb.com/title/${details.imdb_id}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={imdb} alt="" />
                </a>
              </div>
              <p className="movie__info--description">{details.overview}</p>
            </div>
          </section>
          <section className="movie__cast">
            {credits.cast &&
              credits.cast.map((actor) => (
                <Card key={actor.id} type="person" data={actor} />
              ))}
          </section>

          {/* <section className="movie__cast">
            {recommendations &&
              recommendations.map((actor) => (
                <Card key={actor.id} type="recomendation" data={actor} />
              ))}
          </section> */}
        </section>
      ) : (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
