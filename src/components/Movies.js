import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Form from "./Form";

const Movies = () => {
  const [data, setData] = useState([]); // On stocke les films dans un tableau
  const [genres, setGenres] = useState({}); // On stocke les genres dans un objet
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("top");
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Appel API pour les films
  useEffect(() => {
    if (searchQuery) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${searchQuery}&language=fr-FR`
        )
        .then((res) => setData(res.data.results))
        .catch((err) => console.error(err));
    } else {
      // Charger les films populaires par défaut
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR"
        )
        .then((res) => setData(res.data.results))
        .catch((err) => console.error(err));
    }
  }, [searchQuery]);

  // Appel API pour les genres
  useEffect(() => {
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

  // Fonction pour gérer la recherche
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Fonction pour gérer le tri
  const handleSort = (sort) => {
    if (sort === "top") {
      setSort("top");
    } else if (sort === "flop") {
      setSort("flop");
    }
  };

  // Fonction pour ajouter un film aux coups de coeur
  const handleAddToFavorites = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Fonction pour supprimer un film des coups de coeur
  const handleRemoveFromFavorites = (movieId) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="movies">
      <Form handleSearch={handleSearch} handleSort={handleSort} />
      <ul>
        {data
          .sort((a, b) => {
            if (sort === "top") {
              return b.vote_average - a.vote_average;
            } else if (sort === "flop") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              genres={genres}
              handleAddToFavorites={handleAddToFavorites}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              isFavoritesPage={false}
            />
          ))}
      </ul>
    </div>
  );
};

export default Movies;
