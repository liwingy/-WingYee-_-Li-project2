import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cell from '../components/Cell';

function Game() {
  const { difficulty } = useParams();
  const [grid, setGrid] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  // Sets up the size of the grid and the number of mines based on the selected difficulty level
  const config = {
    easy: { size: 8, mines: 10 },
    medium: { size: 16, mines: 40 },
    hard: { size: 30, mines: 99 },
  }[difficulty] || { size: 8, mines: 10 }; // Default to easy if something goes wrong

  // Reset the game every time the difficulty changes
  useEffect(() => {
    resetGame();
  }, [difficulty]);

  // Sets up a new grid and adds mines
  function initializeGrid() {
    // Create a blank grid with cells set to "not revealed" and no mines
    const emptyGrid = Array.from({ length: config.size }, () =>
      Array.from({ length: config.size }, () => ({
        isRevealed: false,
        isMine: false,
        adjacentMines: 0,
      }))
    );

    // Add mines to the grid
    placeMines(emptyGrid);
    setGrid(emptyGrid);
  }

  // Randomly add mines to cells in the grid
  function placeMines(grid) {
    let minesPlaced = 0;
    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.size);
      const col = Math.floor(Math.random() * config.size);

      // Only place a mine if there's not already one there
      if (!grid[row][col].isMine) {
        grid[row][col] = { ...grid[row][col], isMine: true };
        updateAdjacentCounts(grid, row, col); // Update nearby cells to track this new mine
        minesPlaced++;
      }
    }
  }

  // Increments the "adjacentMines" count for cells around a newly placed mine
  function updateAdjacentCounts(grid, row, col) {
    for (let r = Math.max(row - 1, 0); r <= Math.min(row + 1, config.size - 1); r++) {
      for (let c = Math.max(col - 1, 0); c <= Math.min(col + 1, config.size - 1); c++) {
        if (!grid[r][c].isMine) {
          grid[r][c].adjacentMines++;
        }
      }
    }
  }

  // Handles what happens when a player clicks a cell
  function handleClick(row, col) {
    // Do nothing if the game is already over or if the cell is already revealed
    if (isGameOver || grid[row][col].isRevealed) return;

    const newGrid = [...grid];

    // If the cell is a mine, game over!
    if (newGrid[row][col].isMine) {
      setIsGameOver(true);
      alert("Game over! You hit a bomb!");
      revealAllMines(newGrid); // Show all mines
      setGrid(newGrid);
      return;
    }

    // If it's safe, start revealing cells recursively
    revealCell(newGrid, row, col);
    setGrid(newGrid);

    // Check if all non-mine cells are revealed, meaning the player wins
    if (checkWin(newGrid)) {
      setHasWon(true);
      alert("Congratulations! You won!");
    }
  }

  // Recursive function to reveal cells with 0 adjacent mines
  function revealCell(grid, row, col) {
    if (
      row < 0 || col < 0 || row >= config.size || col >= config.size || 
      grid[row][col].isRevealed || grid[row][col].isMine
    ) {
      return; // Stop if out of bounds, already revealed, or a mine
    }

    grid[row][col].isRevealed = true;

    // If the cell has no adjacent mines, keep revealing nearby cells
    if (grid[row][col].adjacentMines === 0) {
      revealCell(grid, row - 1, col);
      revealCell(grid, row + 1, col);
      revealCell(grid, row, col - 1);
      revealCell(grid, row, col + 1);
      revealCell(grid, row - 1, col - 1);
      revealCell(grid, row - 1, col + 1);
      revealCell(grid, row + 1, col - 1);
      revealCell(grid, row + 1, col + 1);
    }
  }

  // Shows all mines when the game is over
  function revealAllMines(grid) {
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      });
    });
  }

  // Checks if the player has revealed all non-mine cells
  function checkWin(grid) {
    return grid.flat().every(cell => cell.isMine || cell.isRevealed);
  }

  // Resets the game by reinitializing the grid and resetting the game state
  function resetGame() {
    setIsGameOver(false);
    setHasWon(false);
    initializeGrid();
  }

  return (
    <div className="game-container">
      <div className="header">
        <h1>Minesweeper</h1>
        <button onClick={resetGame}>Reset</button>
      </div>
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
