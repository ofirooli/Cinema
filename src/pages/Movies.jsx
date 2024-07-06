import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieItem from "../components/movieItem";

const MOVIE_URL = "http://localhost:3000/movies";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch movies from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(MOVIE_URL);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter movies based on search term
  useEffect(() => {
    const filteredResults = movies.filter((movie) =>
      movie.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filteredResults);
  }, [searchTerm, movies]);

  // Handle input change for search
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Delete movie by ID
  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`${MOVIE_URL}/${movieId}`);
      // Update local state to remove the deleted movie
      setMovies(movies.filter(movie => movie._id !== movieId));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <h3>Movies Page</h3>
      <div>
        <button onClick={() => setSearchTerm("")}>All Movies</button>
        <Link to="/addMovie">
          <button>Add Movie</button>
        </Link>
      </div>
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div>
        {filteredMovies.map((movie) => (
          <MovieItem key={movie._id} movie={movie} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default Movies;
