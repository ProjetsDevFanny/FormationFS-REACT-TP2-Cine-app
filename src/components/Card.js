import React from "react";
import defaultPoster from "../assets/img/poster.jpg"; //  importer l’image en haut du fichier React

const Card = ({ movie, genres }) => {
  return (
    <li className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path
            : defaultPoster
        }
        alt={"movie : " + movie.title}
      />
      <h2>{movie.title}</h2>
      <h5>
        Sorti le :{" "}
        {new Date(movie.release_date).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </h5>
      {/* Sorti le : {new Date(movie.release_date).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
           year: "numeric",
        })} */}

      <h4>
        {Math.round(movie.vote_average * 10) / 10} / 10
        <span> ★</span>
      </h4>
      <ul id="genres">
        {movie.genre_ids
          .filter((id) => genres[id]) // on garde seulement les id valides
          .map((id) => (
            <li key={id}>{genres[id]}</li>
          ))}
      </ul>
      <h3>Synopsis</h3>
      <p>{movie.overview ? movie.overview : "Aucun synopsis disponible"}</p>
    </li>
  );
};

export default Card;
