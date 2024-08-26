import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../Container/Container";
import "./style.css";
import { Sidebar } from "../../utils/data";
import { FaRightFromBracket } from "react-icons/fa6";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove tokens and role from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    // Navigate to the login page after logout
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="header">
      <Container>
        <Link className="header-logo" to="/">
          Cyberchallange
        </Link>

        <ul className="header-ul">
          {Sidebar.map((item, index) => (
            <li key={index}>
              <Link className="header-link" to={item.link}>
                <img
                  className="header-img"
                  src={item.img}
                  alt={item.text}
                  width={43}
                  height={53}
                />
                {item.text}
                <svg width="24" height="24">
                  <path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
        <button className="navbtn" onClick={handleLogout}>
          <FaRightFromBracket className="btn-nav right" />
        </button>
      </Container>
    </header>
  );
};
