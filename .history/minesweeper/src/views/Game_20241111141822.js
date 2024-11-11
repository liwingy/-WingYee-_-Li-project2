import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cell from '../components/Cell';

function Game() {
  const { difficulty } = useParams();
  const [grid, setGrid] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const config = {
    easy: { size: 8, mines: 10 },
    medium: { size: 16, mines: 40 },
    hard: { size: 30, mines: 99 },
  }[difficulty] || { size: 8, mines: 10 };

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  function initializeGrid() {
    const emptyGrid = Array.from({ length: config.size }, () =>
      Array.from({ length: config.size }, () => ({
        isRevealed: false,
        isMine: false,
        adjacentMines: 0,
      }))
    );
    placeMines(emptyGrid);
    setGrid(emptyGrid);
  }

  function placeMines(grid) {
    let minesPlaced = 0;
    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.size);
      const col = Math.floor(Math.random() * config.size);
      if (!grid[row][col].isMine) {
        grid[row][col] = { ...grid[row][col], isMine: true };
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

    const newGrid = [...grid];
    if (newGrid[row][col].isMine) {
      setIsGameOver(true);
      alert("Game over! You hit a bomb!");
      revealAllMines(newGrid);
      setGrid(newGrid);
      return;
    }

    newGrid[row][col].isRevealed = true;
    setGrid(newGrid);
  }

  function revealAllMines(grid) {
    // Reveals all mines on the board when the game is over
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      });
    });
  }

  function resetGame() {
    setIsGameOver(false);
    initializeGrid();
  }

  return (
    <div>
      <h1>{isGameOver ? "Game Over" : "Minesweeper"}</h1>
      <button onClick={resetGame}>Reset</button>
      <div className="board" style={{ gridTemplateColumns: `repeat(${config.size}, 1fr)` }}>
        {grid.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <Cell
              key={`${rIndex}-${cIndex}`}
              isRevealed={cell.isRevealed}
              isMine={cell.isMine}
              adjacentMines={cell.adjacentMines}
              onClick={() => handleClick(rIndex, cIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Game;
