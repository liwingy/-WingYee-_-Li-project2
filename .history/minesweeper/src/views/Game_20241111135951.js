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

  // Define the placeMines function here
  function placeMines(grid) {
    let minesPlaced = 0;
    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.size);
      const col = Math.floor(Math.random() * config.size);
      if (!grid[row][col].isMine) {
        grid[row][col].isMine = true;
        updateAdjacentCounts(grid, row, col);
        minesPlaced++;
      }
    }
  }

  function updateAdjacentCounts(grid, row, col) {
    for (let r = Math.max(row - 1, 0); r <= Math.min(row + 1, config.size - 1); r++) {
      for (let c = Math.max(col - 1, 0); c <= Math.min(col + 1, config.size - 1); c++) {
        if (!grid[r][c].isMine) {
          grid[r][c].adjacentMines++;
        }
      }
    }
  }

  function handleClick(row, col) {
    if (isGameOver || grid[row][col].isRevealed) return;

    if (grid[row][col].isMine) {
      setIsGameOver(true);
      alert("Game over! You lost!");
      return;
    }

    const newGrid = [...grid];
    newGrid[row][col].isRevealed = true;
    setGrid(newGrid);

    if (checkWin(newGrid)) {
      setHasWon(true);
      alert("Game over! You won!");
    }
  }

  function checkWin(grid) {
    return grid.flat().every(cell => (cell.isMine || cell.isRevealed));
  }

  function resetGame() {
    setIsGameOver(false);
    setHasWon(false);
    initializeGrid();
  }

  return (
    <div>
      <h1>{hasWon ? "Game over! You Won!" : isGameOver ? "Game over! You lost!" : "Minesweeper"}</h1>
      <button onClick={resetGame}>Reset</button>
      <div className="board">
        {grid.map((row, rIndex) => (
          <div key={rIndex} className="row">
            {row.map((cell, cIndex) => (
              <Cell
                key={`${rIndex}-${cIndex}`}
                isRevealed={cell.isRevealed}
                isMine={cell.isMine}
                adjacentMines={cell.adjacentMines}
                onClick={() => handleClick(rIndex, cIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
