// src/pages/Home.jsx
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovie } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load popular movies on first render
  useEffect(() => {
    const loadPopular = async () => {
      try {
        const popular = await getPopularMovie();
        setMovies(popular);
      } catch (err) {
        setError("Failed to load popular movies.");
      } finally {
        setLoading(false);
      }
    };
    loadPopular();
  }, []);

  // Handle search form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (err) {
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home p-6">
      <form onSubmit={handleSearch} className="mb-6 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="border rounded px-4 py-2 w-72"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : movies.length === 0 ? (
        <p className="text-center">No movies found.</p>
      ) : (
        <div className="movies-grid flex flex-wrap justify-center gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
