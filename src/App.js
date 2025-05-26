import "./styles/index.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Favorites from "./pages/favorites";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
