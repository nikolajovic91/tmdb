import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { dateFormat, minsToHrs } from "../helpers/convertDate";
import { loadShowDetails } from "../store/actions/shows";
import { CLEAR_SHOW_DETAILS } from "../store/types";
import imdb from "../assets/img/imdb.png";
import Card from "./Card";
const PersonDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { details, credits, loading } = useSelector((state) => state.tv);

  const poster = details.poster_path
    ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${details.poster_path}`
    : "https://previews.123rf.com/images/apoev/apoev1806/apoev180600131/103284724-default-placeholder-businessman-half-length-portrait-photo-avatar-man-gray-color.jpg";

  const backImg = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path}`;

  useEffect(() => {
    dispatch(loadShowDetails(id));
    return () => dispatch({ type: CLEAR_SHOW_DETAILS });
  }, [id, dispatch]);

  return (
    <div>
      {!loading && details ? (
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
              <h1 className="movie__info--title">{details.name}</h1>
              <p className="movie__info--genre">
                <span>
                  {new Date(details.first_air_date).toLocaleString(
                    "en-Us",
                    dateFormat
                  )}
                </span>
                <span>
                  {details.genres &&
                    details.genres.map((genre) => genre.name + " ")}
                </span>
                <span>
                  {minsToHrs(
                    details.episode_run_time &&
                      details.episode_run_time.lengtn > 1
                      ? details.episode_run_time[0]
                      : details.episode_run_time
                  )}
                </span>
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

              <section className="movie__info--facts">
                <p className="movie__info--description">
                  Number of seasons: {details.number_of_seasons}
                </p>
                <p className="movie__info--description">
                  Number of episodes: {details.number_of_episodes}
                </p>
                <p className="movie__info--description">
                  Status: {details.status}
                </p>
              </section>
            </div>
          </section>

          <h4>Cast</h4>
          <section className="movie__cast">
            {credits.cast &&
              credits.cast.map((show) => (
                <Card key={show.id} type="person" data={show} />
              ))}
          </section>

          <h4>Seasons</h4>
          <section className="movie__cast">
            {details.seasons &&
              details.seasons.map((s) => (
                <div className="card" key={s.id}>
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${s.poster_path}`}
                    alt=""
                  />
                  <div className="card__info">
                    <h5>
                      {s.name}
                      <span>({s.episode_count && s.episode_count})</span>
                    </h5>
                  </div>
                </div>
              ))}
          </section>
        </section>
      ) : (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default PersonDetail;
