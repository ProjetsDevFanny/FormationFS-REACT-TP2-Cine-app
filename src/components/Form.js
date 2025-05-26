import React from "react";
import { useState } from "react";

const Form = ({ handleSearch }) => {
  const [inputSearch, setInputSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(inputSearch);
  };

  return (
    <div className="form-component">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" />
          <div className="btn-sort-container">
            <span id="goodToBad">Top ↑</span>
            <span id="badToGood"> ↓ Flop</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
