// src/AdminPanel.js
import React from 'react';

const AdminPanel = ({ robots, handleScoreChange, handleWarning, handlePit }) => {
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {robots.map((robot, index) => (
        <div key={index} className="admin-controls">
          <h3>{robot.name}</h3>
          <div>
            <label>Score: </label>
            <button onClick={() => handleScoreChange(index, 1)}>+</button>
            <button onClick={() => handleScoreChange(index, -1)}>-</button>
          </div>
          <div>
            <label>Warnings: {robot.warnings}</label>
            <button onClick={() => handleWarning(index)}>Add Warning</button>
          </div>
          <div>
            <label>Pit Timer: {robot.inPit ? robot.pitTimer : 'Out of Pit'}</label>
            <button onClick={() => handlePit(index)}>Fell in Pit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
