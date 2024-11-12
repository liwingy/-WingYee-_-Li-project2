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
        </Link>

        <Link to="/game/medium" className="difficulty-card">
          <img src={mediumImage} alt="Medium Minesweeper Board" />
        </Link>

        <Link to="/game/hard" className="difficulty-card">
          <img src={hardImage} alt="Hard Minesweeper Board" />
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
