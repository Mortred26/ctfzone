import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Hero } from "./Pages/Hero/Hero";
import { Challanges } from "./Pages/Challanges/Challanges";
import { Scoreboard } from "./Pages/Scoreboard/Scoreboard";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import { useEffect } from "react";
import Scorelist from "./Pages/scorelist/Scorelist";
import Categories from "./Pages/categories/Categories";
import Bunner from "./Pages/banner/banner";
import Team from "./Pages/team/Team";
import ScoreTeam from "./Pages/scoreboardTeam/ScoreTeam";
import CardTeamList from "./Pages/testin/test";

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
            <Route path="/challanges/:id" element={<Challanges />} />
            <Route path="/challange/:id" element={<Categories />} />
            <Route path="/teams" element={<Team />} />
            <Route path="/scoreboard" element={<ScoreTeam />} />
            <Route path="/scoreboard/:id" element={<Scorelist />} />
            <Route path="/bunner" element={<Bunner />} />
            <Route path="/test" element={<CardTeamList />} />
            <Route path="/scoreboards/:id" element={<Scoreboard />} />
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
