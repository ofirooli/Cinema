import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({ user, handleDelete }) => {
  const handleDeleteClick = () => {
    handleDelete(user._id); // Passes the user ID to the handleDelete function
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h4>{user.FullName}</h4>
      <p><strong>Username: </strong> {user.Username}</p>
      <p><strong>Password: </strong> {user.Password}</p>
      <div>
        <Link to={`/editUser/${user._id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDeleteClick} style={{ marginLeft: "10px" }}>Delete</button>
      </div>
    </div>
  );
};

export default UserItem;
