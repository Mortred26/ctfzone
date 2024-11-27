import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Make sure the path is correct
import MatrixRainEffect from "../banner/banner"; // Assuming you still need this component
import { Container } from "../../Components/Container/Container";

const CardTeam = ({ imageSrc, title, totalScore, onClick }) => {
  return (
    <div className="cardteam" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="cardteam_image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="cardteam_title title-white">
        <p>{title}</p>
        <p>{totalScore !== undefined ? totalScore : ""}</p>
      </div>
    </div>
  );
};

const ScoreTeam = () => {
  const [team, setTeam] = useState([]);
  const [totalScores, setTotalScores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Fetch token from local storage or context

    axios
      .get("https://ctfhawksbackend.onrender.com/api/teams", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the request
        },
      })
      .then((response) => {
        setTeam(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  const handleTeamClick = (teamId) => {
    navigate(`/scoreboard/${teamId}`);
  };

  return (
    <>
      <Container>
        <MatrixRainEffect />
        <div className="cards-list2">
          {team.map((teamItem) => (
            <CardTeam
              key={teamItem._id}
              imageSrc="/assets/Imges/score.jpg" // Replace with actual team image if available
              title={teamItem.name}
              totalScore={totalScores[teamItem._id]}
              onClick={() => handleTeamClick(teamItem._id)}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ScoreTeam;
