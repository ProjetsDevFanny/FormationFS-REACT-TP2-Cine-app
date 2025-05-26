import React from "react";
import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Form = ({ handleSearch, handleSort }) => {
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
            <div id="goodToBad"
            onClick={() => handleSort("top")}
            >
              Top{" "}
              <span id="arrow-up">
                <FaArrowUp />
              </span>
            </div>
            <div id="badToGood"
            onClick={() => handleSort("flop")}
            >
              <span id="arrow-down">
                <FaArrowDown />
              </span>{" "}
              Flop
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
