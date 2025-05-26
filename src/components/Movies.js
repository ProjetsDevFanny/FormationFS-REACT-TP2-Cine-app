import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Form from "./Form";

const Movies = () => {
  const [data, setData] = useState([]); // On stocke les films dans un tableau
  const [genres, setGenres] = useState({}); // On stocke les genres dans un objet
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="movies">
      <Form handleSearch={handleSearch} />
      <ul>
        {data.map((movie) => (
          <Card key={movie.id} movie={movie} genres={genres} />
        ))}
      </ul>
    </div>
  );
};

export default Movies;
