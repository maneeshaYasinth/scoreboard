import React, { useState } from 'react';
import './AdminPanel-style.css';
import AdminPanel from './AdminPanel';

function Scoreboard() {
  const [robots, setRobots] = useState([
    { name: 'Robot 1', score: 0, warnings: 0, inPit: false, pitTimer: 0 },
    { name: 'Robot 2', score: 0, warnings: 0, inPit: false, pitTimer: 0 },
  ]);

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

  return (
    <div className="App">
      <h1>Robo Battle Scoreboard</h1>
      <div className="scoreboard">
        {robots.map((robot, index) => (
          <div key={index} className="robot">
            <h2>{robot.name}</h2>
            <p>Score: {robot.score}</p>
            <p>Warnings: {robot.warnings}</p>
            <p>Pit Timer: {robot.inPit ? robot.pitTimer : 'Out of Pit'}</p>
          </div>
        ))}
      </div>
      <AdminPanel 
        robots={robots} 
        handleScoreChange={handleScoreChange} 
        handleWarning={handleWarning} 
        handlePit={handlePit} 
      />
    </div>
  );
}

export default Scoreboard;
