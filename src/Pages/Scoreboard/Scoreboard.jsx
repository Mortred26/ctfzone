import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "../../Components/Container/Container";
import MatrixRainEffect from "../banner/banner";
import { FaSearch } from "react-icons/fa";
import "./style.css";

export const Scoreboard = () => {
  const { id: categoryId } = useParams();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (categoryId) {
      axios
        .get(
          `https://ctfhawksbackend.onrender.com/api/categories/${categoryId}/users-with-scores`
        )
        .then((response) => {
          setUsers(response.data);
          setFilteredUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Foydalanuvchilarni olishda xatolik:", error);
          setError("Foydalanuvchilarni olishda xatolik yuz berdi.");
          setLoading(false);
        });
    }
  }, [categoryId]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const applyFilter = () => {
    if (searchTerm === "") {
      setFilteredUsers(users); // Agar qidiruv bo'sh bo'lsa, barcha foydalanuvchilarni ko'rsatish
    } else {
      const filtered = users.filter((user) => {
        const nameMatch = user.name.toLowerCase().includes(searchTerm);
        const scoreMatch = user.totalCategoryScore
          .toString()
          .includes(searchTerm);
        const dateMatch = user.latestCompletionTime
          ? formatTimeAgo(user.latestCompletionTime)
              .toLowerCase()
              .includes(searchTerm)
          : false;

        return nameMatch || scoreMatch || dateMatch;
      });

      setFilteredUsers(filtered);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const secondsAgo = Math.floor((now - time) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    if (secondsAgo < 60) {
      return "just now";
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else {
      return `${daysAgo} days ago`;
    }
  };

  // Foydalanuvchilarni `totalCategoryScore` bo'yicha kamayish tartibida saralash
  const sortedUsers = [...filteredUsers].sort(
    (a, b) => b.totalCategoryScore - a.totalCategoryScore
  );

  return (
    <>
      <MatrixRainEffect />
      <section className="scoreboard">
        <Container>
          <div className="user-nav">
            <h3 className="usernav-name">Search Users</h3>

            <div className="user-input">
              <input
                type="text"
                placeholder="Search by name, score, or completion time"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <button className="btn-user" onClick={applyFilter}>
              <FaSearch className="btn-search" />
            </button>
          </div>
          {loading && <p>Loading users and scores...</p>}
          {error && <p>{error}</p>}
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>User</th>
                <th>Total Score in Category</th>
                <th>Last Completion Time</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.totalCategoryScore}</td>
                  <td>
                    {user.latestCompletionTime
                      ? formatTimeAgo(user.latestCompletionTime)
                      : "Not completed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </section>
    </>
  );
};
