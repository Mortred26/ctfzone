import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; // Make sure the path is correct
import { Container } from "../../Components/Container/Container";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/Imges/ctf.jpg";
import MatrixRainEffect from "../banner/banner";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [Tests, setTests] = useState([]);
  const [totalscore, SetTotalScrore] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the categories from the API
    axios
      .get("https://ctfhawksbackend.onrender.com/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch the groups from the API
    axios
      .get("https://ctfhawksbackend.onrender.com/api/groups")
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch the tests from the API
    axios
      .get("https://ctfhawksbackend.onrender.com/api/tests")
      .then((response) => {
        setTests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tests:", error);
      });
  }, []);

  const findtotal = (id) => {
    const categoryGroups = groups.filter((group) => group.category === id);
    let totalScore = 0;

    categoryGroups.forEach((group) => {
      const groupTests = Tests.filter((test) => test.group === group._id);
      const groupScore = groupTests.reduce((sum, test) => sum + test.score, 0);
      totalScore += groupScore;
    });

    SetTotalScrore(totalScore);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/challange/${categoryId}`);
  };

  return (
    <>
      <MatrixRainEffect />
      <Container>
        <div className="row">
          {categories.map((category) => (
            <div
              className="category-main"
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              onMouseEnter={() => findtotal(category._id)} // Kursor olib borilganda chaqiriladi
              style={{ cursor: "pointer" }}
            >
              <div className="card">
                <div
                  className="cover item"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                  <h1 className="category-title">{category.name}</h1>
                  <span className="price">{category.score}</span>
                  <div className="card-back">
                    <a href="#">{category.name}</a>
                    <a href="#">{totalscore}</a>
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

export default Categories;
