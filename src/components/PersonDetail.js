import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadPersonDetails } from "../store/actions/persons";
import { CLEAR_PERSON_DETAILS } from "../store/types";
import imdb from "../assets/img/imdb.png";

import Card from "./Card";

const PersonDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { details, movieCredits, tvCredits, loading } = useSelector(
    (state) => state.persons
  );
  
  let actorImg = details.profile_path
    ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${details.profile_path}`
    : "https://previews.123rf.com/images/apoev/apoev1806/apoev180600131/103284724-default-placeholder-businessman-half-length-portrait-photo-avatar-man-gray-color.jpg";

  useEffect(() => {
    dispatch(loadPersonDetails(id));
    return () => dispatch({ type: CLEAR_PERSON_DETAILS });
  }, [id, dispatch]);

  return (
    <div>
      {!loading ? (
        <section className="movie">
          <section className="movie__info">
            <div className="movie__info--image">
              <img src={actorImg} alt="" />
            </div>
            <div className="movie__info--text">
              <h1 className="movie__info--title">{details.name}</h1>

              <p className="movie__info--tagline">{details.place_of_birth}</p>
              <div className="movie__info--biography">
                <h4>Biography</h4>
                <a
                  href={`https://www.imdb.com/name/${details.imdb_id}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={imdb} alt="" />
                </a>
              </div>
              <p className="movie__info--description">{details.biography}</p>
            </div>
          </section>
          <h4>Movies</h4>
          <section className="movie__cast">
            {movieCredits.cast &&
              movieCredits.cast.map((movie) => (
                <Card key={`${movie.id}-movie`} type="movie" data={movie} />
              ))}
          </section>
          <h4>Tv Shows</h4>
          <section className="movie__cast">
            {tvCredits.cast &&
              tvCredits.cast.map((show) => (
                <Card key={`${show.id}-show`} type="show" data={show} />
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
