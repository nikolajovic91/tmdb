import React, { useState, useEffect } from "react";
import api, { token } from "../api/api";
import { useParams } from "react-router";
import Card from "./Card";
import { dateFormat, minsToHrs } from "../helpers/convertDate";
import CircularProgress from "@material-ui/core/CircularProgress";
const PersonDetail = () => {
  const { id } = useParams();

  const [show, setShow] = useState({});
  const [credits, setCredits] = useState([]);

  const [loading, setLoading] = useState(true);
  const getPersonDetail = async () => {
    const details = await api.get(`/tv/${id}?${token}`);
    const credits = await api.get(`/tv/${id}/credits?${token}`);

    setShow(details.data);
    setCredits(credits.data.cast);
    setLoading(false);
  };
  console.log(credits);
  const poster = show.poster_path
    ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${show.poster_path}`
    : "https://previews.123rf.com/images/apoev/apoev1806/apoev180600131/103284724-default-placeholder-businessman-half-length-portrait-photo-avatar-man-gray-color.jpg";

  const backImg = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${show.backdrop_path}`;

  useEffect(() => {
    getPersonDetail();
  }, []);

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
              <h1 className="movie__info--title">{show.name}</h1>
              <p className="movie__info--genre">
                {new Date(show.first_air_date).toLocaleString(
                  "en-Us",
                  dateFormat
                )}
                <span>
                  {show.genres && show.genres.map((genre) => genre.name + " ")}
                </span>
                {minsToHrs(show.episode_run_time[0])}
              </p>
              <p className="movie__info--tagline">{show.tagline}</p>
              <h4>Overview</h4>
              <p className="movie__info--description">{show.overview}</p>

              <section className="movie__info--facts">
                <p className="movie__info--description">
                  Number of seasons: {show.number_of_seasons}
                </p>
                <p className="movie__info--description">
                  Number of episodes: {show.number_of_episodes}
                </p>
                <p className="movie__info--description">
                  Status: {show.status}
                </p>
              </section>
            </div>
          </section>

          <h4>Cast</h4>
          <section className="movie__cast">
            {credits &&
              credits.map((show) => (
                <Card key={show.id} type="person" data={show} />
              ))}
          </section>

          <h4>Seasons</h4>
          <section className="movie__cast">
            {show.seasons &&
              show.seasons.map((s) => (
                <div className="card">
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
