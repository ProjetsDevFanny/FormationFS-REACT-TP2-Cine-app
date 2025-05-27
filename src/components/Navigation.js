import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            Coups de coeur
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
