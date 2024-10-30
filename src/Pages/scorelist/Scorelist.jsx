import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; // Make sure the path is correct
import { Container } from "../../Components/Container/Container";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../../assets/Imges/ctf.jpg";
import MatrixRainEffect from "../banner/banner";

const Scorelist = () => {
  const [categories, setCategories] = useState([]);
  const [totalScores, setTotalScores] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve team ID from URL parameters

  useEffect(() => {
    // Fetch categories related to the specific team ID
    axios
      .get(`https://ctfhawksbackend.onrender.com/api/categories/team/${id}`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id]); // Dependency on `id` to refetch when the team ID changes

  const fetchTotalScore = (categoryId) => {
    axios
      .get(
        `https://ctfhawksbackend.onrender.com/api/categories/${categoryId}/total-score`
      )
      .then((response) => {
        setTotalScores((prevScores) => ({
          ...prevScores,
          [categoryId]: response.data.totalScore,
        }));
      })
      .catch((error) => {
        console.error("Error fetching total score:", error);
      });
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/scoreboards/${categoryId}`);
  };

  return (
    <>
      <Container>
        <MatrixRainEffect />
        <div className="row">
          {categories.map((category) => (
            <div
              className="category-main"
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              onMouseEnter={() =>
                fetchTotalScore(category._id, console.log(category._id))
              } // Kursor olib borilganda umumiy ballarni yuklash
              style={{ cursor: "pointer" }}
            >
              <div className="card">
                <div
                  className="cover item"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                  <h1 className="category-title">{category.name}</h1>
                  <div className="card-back">
                    <a href="#">{category.name}</a>
                    <a href="#">
                      {totalScores[category._id] !== undefined
                        ? totalScores[category._id]
                        : ""}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Scorelist;
