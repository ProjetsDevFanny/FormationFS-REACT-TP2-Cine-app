import React from "react";
import Movies from "../components/Movies";
import Navigation from "../components/Navigation";
import TittleHome from "../components/TittleHome";

const home = () => {
  return (
    <div>
      <Navigation />
      <TittleHome />
      <Movies />
    </div>
  );
};

export default home;
