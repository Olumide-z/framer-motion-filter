import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./Filter";
import Movie from "./Movie";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=3063e6beaffd5118bd176b35e99fee56&language=en-US&page=1";

  const fetchPopular = async () => {
    const data = await fetch(url);

    const movies = await data.json();

    console.log(movies);
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div
        layout
        className="popular-movies"
      >
        <AnimatePresence>
        {filtered.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
