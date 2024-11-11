import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cell from '../components/Cell';

function Game() {
  const { difficulty } = useParams();
  const [grid, setGrid] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const config = {
    easy: { size: 8, mines: 10 },
    medium: { size: 16, mines: 40 },
    hard: { size: 30, mines: 99 },
  }[difficulty] || { size: 8, mines: 10 };

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  function initializeGrid() {
    const emptyGrid = Array(config.size).fill(null).map(() => Array(config.size).fill({
      isRevealed: false, isMine: false, adjacentMines: 0,
    }));

    placeMines(emptyGrid);
    setGrid(emptyGrid);
  }

  function resetGame() {
    setIsGameOver(false);
    setHasWon(false);
    initializeGrid();
  }

  return (
    <div>
      <h1>{hasWon ? "You Won!" : isGameOver ? "Game Over" : "Minesweeper"}</h1>
      <button onClick={resetGame}>Reset</button>
      {/* Render the game board here */}
    </div>
  );
}

export default Game;
