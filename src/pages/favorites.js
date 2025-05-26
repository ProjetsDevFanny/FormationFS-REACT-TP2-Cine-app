import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import TittleHome from "../components/TittleHome";
import Card from "../components/Card";
import axios from "axios";
import heartStar from "../assets/img/coeur.png"; //

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [genres, setGenres] = useState({});

  // Charger les favoris depuis le localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    // Charger les genres aussi ici
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR"
      )
      .then((res) => {
        const genreMap = {};
        res.data.genres.forEach((g) => {
          genreMap[g.id] = g.name;
        });
        setGenres(genreMap);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fonction pour supprimer un film des coups de coeur
  const handleRemoveFromFavorites = (movieId) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="favorites-page">
      <Navigation />
      <TittleHome />
      <h2>
        Coups de coeur{" "}
        <span>
          {" "}
          <img
            className="heart-star"
            src={heartStar}
            alt="Icône cœur avec étoile"
          />
        </span>
      </h2>
      <div className="favorites-list">
        {favorites.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            genres={genres}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
            isFavorite={true}
            isFavoritesPage={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
