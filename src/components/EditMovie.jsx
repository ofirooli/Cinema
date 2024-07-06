import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const EditMovie = () => {
  const { id } = useParams(); // Fetch the movie ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    YearPremiered: "",
    Genres: [],
    imageUrl: ""
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/movies/${id}`);
        if (data) {
          setFormData({
            Name: data.Name || "",
            YearPremiered: data.YearPremiered || "",
            Genres: data.Genres || [],
            imageUrl: data.imageUrl || ""
          });
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/movies/${id}`, formData);
      alert("Movie updated successfully!");
      navigate("/movies"); // Navigate only after successful update
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie. Please try again.");
    }
  };

  return (
    <div>
      <h3>Edit Movie</h3>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            required // Example of basic form validation
          />
        </label>
        <br />
        <label>
          Year Premiered:
          <input
            type="text"
            name="YearPremiered"
            value={formData.YearPremiered}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Genres:
          <input
            type="text"
            name="Genres"
            value={formData.Genres.join(", ")}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <div>
          <button type="submit" onClick={handleSubmit}>Save Changes</button>
          <Link to="/movies">
            <button type="button">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
