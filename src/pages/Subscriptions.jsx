import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MemberItem from "../components/memberItem";

const MEMBER_URL = "http://localhost:3000/members";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(MEMBER_URL);
        setMembers(data);
        setFilteredMembers(data); // Initially set all members as filteredMembers
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResults = members.filter((member) =>
      member.Name && member.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filteredResults);
  }, [searchTerm, members]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowAllMembers = () => {
    setFilteredMembers(members); // Show all members
    setSearchTerm(""); // Clear search term
  };

  return (
    <>
      <h3>Subscription Page</h3>
      <div>
        <button onClick={handleShowAllMembers}>All Members</button>
        <Link to="/addSub">
          <button>Add Subscription</button>
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
        {filteredMembers.map((member) => (
          <MemberItem key={member._id} member={member} />
        ))}
      </div>
    </>
  );
};

export default Members;
