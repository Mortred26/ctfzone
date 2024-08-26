import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; // Make sure the path is correct
import { Container } from "../../Components/Container/Container";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/Imges/ctf.jpg";

const Categories = () => {
  const [categories, setCategories] = useState([]);
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

  const handleCategoryClick = (categoryId) => {
    navigate(`/challange/${categoryId}`);
  };

  return (
    <>
      <Container>
        <div className="row">
          {categories.map((category) => (
            <div
              className="category-main"
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
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
                    <a href="#">{category.language}</a>
                    <a href="#">{category.testsCount}</a>
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
