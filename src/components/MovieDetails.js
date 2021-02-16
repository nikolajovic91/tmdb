import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import api, { token } from "../api/api";
import Card from "./Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import {dateFormat, minsToHrs} from '../helpers/convertDate'
const MovieDetails = () => {
  const { id } = useParams();

  const [detail, setDetail] = useState([]);
  const [credit, setCredits] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovieDetail = async () => {
    const response = await api.get(`/movie/${id}?${token}`);
    const credits = await api.get(`/movie/${id}/credits?${token}`);
    const recomend = await api.get(`/movie/${id}/recommendations?${token}`);
    setDetail(response.data);
    setCredits(credits.data.cast.splice(0, 18));
    setRecommendations(recomend.data.results);
    setLoading(false);
    console.log(detail);
  };
  const poster = detail.poster_path
    ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${detail.poster_path}`
    : "https://previews.123rf.com/images/apoev/apoev1806/apoev180600131/103284724-default-placeholder-businessman-half-length-portrait-photo-avatar-man-gray-color.jpg";

  const backImg = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${detail.backdrop_path}`;
  useEffect(() => {
    getMovieDetail();
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
              <h1 className="movie__info--title">{detail.title}</h1>
              <p className="movie__info--genre">
                { new Date(detail.release_date).toLocaleString("en-Us", dateFormat)}
                <span>
                  {detail.genres &&
                    detail.genres.map((genre) => genre.name + " ")}
                </span>
                {minsToHrs(detail.runtime)}
              </p>

              <p className="movie__info--tagline">{detail.tagline}</p>
              <h4>Overview</h4>
              <p className="movie__info--description">{detail.overview}</p>
            </div>
          </section>
          <section className="movie__cast">
            {credit &&
              credit.map((actor) => (
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
