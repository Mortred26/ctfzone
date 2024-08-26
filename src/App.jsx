import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Hero } from "./Pages/Hero/Hero";
import { Challanges } from "./Pages/Challanges/Challanges";
import { Scoreboard } from "./Pages/Scoreboard/Scoreboard";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import { useEffect } from "react";
import Scorelist from "./Pages/scorelist/Categories";
import Categories from "./Pages/categories/categories";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <BrowserRouter>
      {accessToken ? (
        <>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/challange/:id" element={<Challanges />} />
            <Route path="/challange" element={<Categories />} />
            <Route path="/scoreboard" element={<Scorelist />} />
            <Route path="/scoreboard/:id" element={<Scoreboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
