import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <h1>Welcome to Minesweeper</h1>
      <p>Select a difficulty to start playing!</p>
      <Link to="/game/easy">Easy</Link>
      <Link to="/game/medium">Medium</Link>
      <Link to="/game/hard">Hard</Link>
    </div>
  );
}

export default Homepage;
