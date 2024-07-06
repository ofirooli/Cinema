// EditUser.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const USER_URL = "http://localhost:3000/users";

const EditUser = () => {
  const { id } = useParams(); // Get id from URL params

  const [user, setUser] = useState({
    FullName: "",
    Username: "",
    Password: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${USER_URL}/${id}`);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${USER_URL}/${id}`, user);
      // Redirect to users page after successful update
      window.location.href = "/users"; // Simulate navigation
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="FullName"
            value={user.FullName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="Username"
            value={user.Username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="Password"
            value={user.Password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save Changes</button>
        <Link to="/users">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditUser;
