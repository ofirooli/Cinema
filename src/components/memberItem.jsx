import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Watched from "./membersWatched"; // Import the Watched component

const MemberItem = ({ member, handleDelete }) => {
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    const fetchUserFullName = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${member.UserID}`);
        setUserFullName(data.FullName);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserFullName();
  }, [member.UserID]);

  const handleDeleteClick = () => {
    handleDelete(member._id);
  };

  return (
    <div style={{ display: 'flex', border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <div style={{ marginRight: '20px', flex: '1' }}>
        <h4>Name: {userFullName}</h4>
        <p><strong>Email:</strong> {member.Email}</p>
        <p><strong>City:</strong> {member.City}</p>
        <div>
          <Link to={`/editMember/${member._id}`}>
            <button style={{ marginRight: '10px' }}>Edit</button>
          </Link>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
      <div style={{ flex: '1', border: '1px solid black', padding: '10px' }}>
        <Watched memberId={member._id} /> {/* Render Watched component */}
      </div>
    </div>
  );
};

export default MemberItem;
