import React from 'react';
import { Link } from 'react-router-dom';
import easyImage from '../pics/easy.jpg';
import mediumImage from '../pics/med.jpg';
import hardImage from '../pics/hard.jpg';
import './Homepage.css';

function Homepage() {
  return (
    <div className="homepage">
      <h1>Welcome to Minesweeper</h1>
      <p>Select a difficulty to start playing!</p>
      
      <div className="difficulty-section">
        <Link to="/game/easy" className="difficulty-card">
          <img src={easyImage} alt="Easy Minesweeper Board" />
          <h3>Easy</h3>
        </Link>

        <Link to="/game/medium" className="difficulty-card">
          <img src={mediumImage} alt="Medium Minesweeper Board" />
          <h3>Medium</h3>
        </Link>

        <Link to="/game/hard" className="difficulty-card">
          <img src={hardImage} alt="Hard Minesweeper Board" />
          <h3>Hard</h3>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
