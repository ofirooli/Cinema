import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserItem from "../components/usersItem"; // Ensure UserItem component is imported

const USER_URL = "http://localhost:3000/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(USER_URL);
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false); // Data fetching complete
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Handle loading state on error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResults = users.filter(
      (user) =>
        user.FullName && user.FullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredResults);
  }, [searchTerm, users]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowAllUsers = () => {
    setFilteredUsers(users);
    setSearchTerm("");
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${USER_URL}/${userId}`);
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <>
      <h3>Users Page</h3>
      <div>
        <button onClick={handleShowAllUsers}>All Users</button>
        <Link to="/addUser">
          <button>Add User</button>
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
        {filteredUsers.map((user) => (
          <UserItem key={user._id} user={user} handleDelete={handleDeleteUser} />
        ))}
      </div>
    </>
  );
};

export default Users;
