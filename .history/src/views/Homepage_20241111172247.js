import React from 'react';
import { Link } from 'react-router-dom';
import easyImage from './pics/dde52b68-5497-4642-83a4-ae9746218568.webp';
import mediumImage from './pics/e2a8d83f-cd7c-4417-b8d5-64817b13f323.webp';
import hardImage from './pics/02bece3a-6fe7-42bb-a740-fee34fb503b3.webp';
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
