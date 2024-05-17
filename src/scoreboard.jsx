// src/Scoreboard.js
import React from 'react';

const Scoreboard = ({ robots }) => {
  return (
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
  );
};

export default Scoreboard;
