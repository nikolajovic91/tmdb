import React, { useState, useEffect } from "react";
import api, { token } from "../api/api";
import { useParams } from "react-router";
import Card from "./Card";
import CircularProgress from "@material-ui/core/CircularProgress";
const PersonDetail = () => {
  const { id } = useParams();

  const [person, setPerson] = useState({});
  const [movieCredits, setMovieCredits] = useState([]);
  const [showCredits, setShowCredits] = useState([]);

  const [loading, setLoading] = useState(true);
  const getPersonDetail = async () => {
    const details = await api.get(`/person/${id}?${token}`);
    const credits = await api.get(`/person/${id}/movie_credits?${token}`);
    const tvCredits = await api.get(`/person/${id}/tv_credits?${token}`);

    setPerson(details.data);
    setMovieCredits(credits.data.cast);
    setShowCredits(tvCredits.data.cast);
    setLoading(false);
  };

  let actorImg = person.profile_path
    ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${person.profile_path}`
    : "https://previews.123rf.com/images/apoev/apoev1806/apoev180600131/103284724-default-placeholder-businessman-half-length-portrait-photo-avatar-man-gray-color.jpg";

  useEffect(() => {
    getPersonDetail();
  }, []);

  return (
    <div>
      {!loading ? (
        <section className="movie">
          <section className="movie__info">
            <div className="movie__info--image">
              <img src={actorImg} alt="" />
            </div>
            <div className='movie__info--text'>
              <h1 className="movie__info--title">{person.name}</h1>

              <p className="movie__info--tagline">{person.place_of_birth}</p>
              <h4>Biography</h4>
              <p className="movie__info--description">{person.biography}</p>
            </div>
          </section>
          <h4>Movies</h4>
          <section className="movie__cast">
            {movieCredits &&
              movieCredits.map((movie) => <Card key={`${movie.id}-movie`} type='movie' data={movie} />)}
          </section>
          <h4>Tv Shows</h4>
          <section className="movie__cast">
            {showCredits &&
              showCredits.map((show) => <Card key={`${show.id}-show`} type='show' data={show} />)}
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
