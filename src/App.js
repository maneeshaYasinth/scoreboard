// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Scoreboard from './scoreboard';
import AdminPanel from './AdminPanel';
import Login from './Login';

function App() {
  const [robots, setRobots] = useState([
    { name: 'Robot 1', score: 0, warnings: 0, inPit: false, pitTimer: 0 },
    { name: 'Robot 2', score: 0, warnings: 0, inPit: false, pitTimer: 0 },
  ]);

  const [isAdmin, setIsAdmin] = useState(false);

  const handleScoreChange = (index, delta) => {
    const newRobots = [...robots];
    newRobots[index].score += delta;
    setRobots(newRobots);
  };

  const handleWarning = (index) => {
    const newRobots = [...robots];
    newRobots[index].warnings += 1;
    setRobots(newRobots);
  };

  const handlePit = (index) => {
    const newRobots = [...robots];
    newRobots[index].inPit = true;
    newRobots[index].pitTimer = 10; // 10 seconds timer
    setRobots(newRobots);

    const interval = setInterval(() => {
      setRobots((robots) => {
        const updatedRobots = [...robots];
        if (updatedRobots[index].pitTimer > 0) {
          updatedRobots[index].pitTimer -= 1;
        } else {
          updatedRobots[index].inPit = false;
          clearInterval(interval);
        }
        return updatedRobots;
      });
    }, 1000);
  };

  const handleLogin = (status) => {
    setIsAdmin(status);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scoreboard robots={robots} />} />
        <Route path="/login" element={isAdmin ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={isAdmin ? (
            <AdminPanel
              robots={robots}
              handleScoreChange={handleScoreChange}
              handleWarning={handleWarning}
              handlePit={handlePit}
            />
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
