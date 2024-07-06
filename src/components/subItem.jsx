import React from "react";
import { Link } from "react-router-dom";

const SubItem = ({ sub, handleDelete }) => {
  const handleDeleteClick = () => {
    handleDelete(sub._id);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h4>Subscriptions</h4>
      <p><strong>Movie: </strong> {sub.MovieID}</p>
      <p><strong>Member: </strong> {sub.MovieID}</p>
      <p><strong>Date: </strong> {sub.Date}</p>
      <div>
        <Link to={`/editSub/${sub._id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDeleteClick} style={{ marginLeft: "10px" }}>Delete</button>
      </div>
    </div>
  );
};

export default SubItem;
