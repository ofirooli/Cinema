import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SUB_URL = "http://localhost:3000/subs"; // Adjust URL as per your API endpoint
const MOVIES_URL = "http://localhost:3000/movies"; // URL for fetching movies
const MEMBERS_URL = "http://localhost:3000/users"; // URL for fetching members

const AddSub = () => {
  const navigate = useNavigate(); // Initialize navigate hook for redirection

  const [subscription, setSubscription] = useState({
    MovieID: "",
    MemberID: "",
    Date: "",
    // Add other fields as per your subscription structure
  });

  const [movies, setMovies] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
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

    fetchMovies();
    fetchMembers();
  }, []);

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
      await axios.post(SUB_URL, subscription);
      console.log("Subscription added successfully:", subscription);
      navigate("/subs"); // Redirect to /subs after a successful save
    } catch (error) {
      console.error("Error adding subscription:", error);
    }
  };

  return (
    <div>
      <h3>Add Subscription</h3>
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
          <label>Member:</label>
          <select
            name="MemberID"
            value={subscription.MemberID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a member</option>
            {members.map((member) => (
              <option key={member._id.$oid} value={member._id.$oid}>
                {member.FullName}
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
        <button type="submit">Save</button>
        <Link to="/subs">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default AddSub;
