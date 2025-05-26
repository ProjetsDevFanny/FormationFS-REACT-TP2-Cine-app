import React from "react";
import defaultPoster from "../assets/img/poster.jpg"; //  importer l'image en haut du fichier React
import { FaHeart } from "react-icons/fa";

const Card = ({
  movie,
  genres,
  handleAddToFavorites,
  handleRemoveFromFavorites,
  isFavorite,
  isFavoritesPage,
}) => {
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
      <div
        className={`btn ${isFavorite ? "favorite" : ""}`}
        onClick={() => {
          if (isFavoritesPage) {
            handleRemoveFromFavorites(movie.id);
          } else if (!isFavorite) {
            handleAddToFavorites(movie);
          }
        }}
      >
        <h4>
          {isFavoritesPage
            ? "Supprimer de la liste"
            : isFavorite
            ? "Déjà dans les coups de coeur"
            : "Ajouter aux coups de coeur"}{" "}
          <span>
            <FaHeart />
          </span>
        </h4>
      </div>
    </li>
  );
};

export default Card;
