import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const EditMember = () => {
  const { id } = useParams(); // Get member ID from URL params

  const [formData, setFormData] = useState({
    email: "",
    city: "",
  });

  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        // Fetch member details based on member ID
        const { data: member } = await axios.get(
          `http://localhost:3000/members/${id}`
        );
        setFormData({
          email: member.Email,
          city: member.City,
        });

        // Fetch user's full name based on UserID from the member
        const { data: user } = await axios.get(
          `http://localhost:3000/users/${member.UserID}`
        );
        setUserFullName(user.FullName);
      } catch (error) {
        console.error("Error fetching member or user:", error);
      }
    };

    fetchMemberDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update member details using PUT request
      await axios.put(`http://localhost:3000/members/${id}`, {
        Email: formData.email,
        City: formData.city,
      });
      alert("Member updated successfully!");
      // Navigate back to subs page
      window.location.href = "/subs"; // This line is changed to navigate without useHistory
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member. Please try again.");
    }
  };

  return (
    <div>
      <h3>Edit Member</h3>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>Full Name: {userFullName}</label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            required
            className="input-email" // Added class name "input-email"
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <Link to="/subs">
          <button type="button">Back</button>
        </Link>
      </form>
    </div>
  );
};

export default EditMember;
