import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SUB_URL = "http://localhost:3000/subs"; // Adjust URL as per your API endpoint
const MOVIES_URL = "http://localhost:3000/movies"; // URL for fetching movies
const MEMBERS_URL = "http://localhost:3000/users"; // URL for fetching members

const EditSub = () => {
  const { id } = useParams(); // Get the member id from URL params

  const [subscription, setSubscription] = useState({
    MovieID: "",
    MemberID: id, // Initialize MemberID with the id from URL
    Date: "",
    // Add other fields as per your subscription structure
  });

  const [memberName, setMemberName] = useState(""); // State to hold member's name
  const [movies, setMovies] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMemberName = async () => {
      try {
        const { data } = await axios.get(`${MEMBERS_URL}/${id}`);
        setMemberName(data.FullName); // Set the member's full name
      } catch (error) {
        console.error("Error fetching member:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(MOVIES_URL);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchMembers = async () => {
      try {
        const { data } = await axios.get(MEMBERS_URL);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMemberName(); // Fetch member's name based on id
    fetchMovies();
    fetchMembers();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubscription((prevSubscription) => ({
      ...prevSubscription,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(SUB_URL, subscription); // Use POST to create a new subscription
      alert("Subscription added successfully!");
      // Redirect or handle success state as needed
    } catch (error) {
      console.error("Error adding subscription:", error);
    }
  };

  return (
    <div>
      <h3>Add Subscription for {memberName}</h3> {/* Display member's name */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Movie:</label>
          <select
            name="MovieID"
            value={subscription.MovieID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="Date"
            value={subscription.Date}
            onChange={handleInputChange}
            required
          />
        </div>
        <br />
        <button type="submit">Add Subscription</button>
        <Link to="/subs">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditSub;
