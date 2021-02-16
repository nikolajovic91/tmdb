import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

const Card = ({ data, type }) => {
  const history = useHistory();

  

  let movieImg = `https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`;
  let actorImg = data.profile_path
    ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data.profile_path}`
    : "https://previews.123rf.com/images/apoev/apoev1806/apoev180600131/103284724-default-placeholder-businessman-half-length-portrait-photo-avatar-man-gray-color.jpg";

  if (type === "person") {
    const nameToSlug = data.name.toLowerCase().replace(' ', '-')
    return (
      <div
        className="card"
        onClick={() =>
          history.push({
            pathname: `/person/${data.id}/${nameToSlug}`,
            state: { person: data },
          })
        }
      >
        <img src={actorImg} alt="" />
        <div className="card__info">
          <h5>{data.name}</h5>
          <span>{data.character}</span>
        </div>
      </div>
    );
  } else if (type === "movie") {
    return (
      <div
        className="card"
        onClick={() =>
          history.push({
            pathname: `/movies/${data.id}`,
            state: { movie: data },
          })
        }
      >
        <img src={movieImg} alt="" />
        <div className="card__info">
          <h5>
            {data.title}
            <span>({data.release_date && data.release_date.slice(0, 4)})</span>
          </h5>
        </div>
      </div>
    );
  } else if (type === "show") {
    return (
      <div
        className="card"
        onClick={() =>
          history.push({
            pathname: `/shows/${data.id}`,
            state: { show: data },
          })
        }
      >
        <img src={movieImg} alt="" />
        <div className="card__info">
          <h5>
            {data.name}
            <span>({data.first_air_date && data.first_air_date.slice(0, 4)})</span>
          </h5>
        </div>
      </div>
    );
  }else if (type === "tv_season") {
    return (
      <div
        className="card"
      >
        <img src={movieImg} alt="" />
        <div className="card__info">
          <h5>
            {data.name}
            <span>({data.episode_count && data.episode_count})</span>
          </h5>
        </div>
      </div>
    );
  }
};

export default Card;
