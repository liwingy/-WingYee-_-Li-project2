import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cell from '../components/Cell';

function Game() {
  const { difficulty } = useParams();

  // Define game states and configurations
  const [grid, setGrid] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [flagCount, setFlagCount] = useState(0);

  // Configuration for different difficulties
  const config = {
    easy: { size: 8, mines: 10 },
    medium: { size: 16, mines: 40 },
    hard: { size: 30, mines: 99 },
  }[difficulty] || { size: 8, mines: 10 };

  // Reset the game when the component mounts or the difficulty changes
  useEffect(() => {
    resetGame(); // Initialize game state
  }, [difficulty]);

  // Initialize a new grid and set up mines
  function initializeGrid() {
    const emptyGrid = Array.from({ length: config.size }, () =>
      Array.from({ length: config.size }, () => ({
        isRevealed: false,
        isMine: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );
    setGrid(emptyGrid); // Set grid to the initial empty grid
    setFlagCount(config.mines); // Initialize flag count based on mines
  }

  // Place mines on the grid, avoiding the first click position
  function placeMinesAvoidingFirstClick(grid, firstRow, firstCol) {
    let minesPlaced = 0;
    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.size);
      const col = Math.floor(Math.random() * config.size);

      if ((row !== firstRow || col !== firstCol) && !grid[row][col].isMine) {
        grid[row][col] = { ...grid[row][col], isMine: true };
        updateAdjacentCounts(grid, row, col);
        minesPlaced++;
      }
    }
  }

  // Update the adjacent mine count for cells surrounding a new mine
  function updateAdjacentCounts(grid, row, col) {
    for (let r = Math.max(row - 1, 0); r <= Math.min(row + 1, config.size - 1); r++) {
      for (let c = Math.max(col - 1, 0); c <= Math.min(col + 1, config.size - 1); c++) {
        if (!grid[r][c].isMine) {
          grid[r][c].adjacentMines++;
        }
      }
    }
  }

  // Handle left-click on a cell, with Safe First Turn logic
  function handleClick(row, col) {
    if (isGameOver || grid[row][col].isRevealed) return;

    const newGrid = [...grid];

    // Place mines on first click, avoiding the clicked cell
    if (isFirstClick) {
      placeMinesAvoidingFirstClick(newGrid, row, col);
      setIsFirstClick(false);
    }

    // Check if the cell is a mine
    if (newGrid[row][col].isMine) {
      setIsGameOver(true);
      alert("Game over🙈! You hit a bomb💣!");
      revealAllMines(newGrid);
      setGrid(newGrid);
      return;
    }

    // Reveal the cell and adjacent cells if no adjacent mines
    revealCell(newGrid, row, col);
    setGrid(newGrid);

    // Check if the player has won
    if (checkWin(newGrid)) {
      setHasWon(true);
      alert("Congratulations! You won🏅!");
    }
  }

  // Right-click or shift-click to toggle a flag, implementing the Flag Bomb Function
  function handleRightClick(event, row, col) {
    event.preventDefault();
    if (isGameOver || grid[row][col].isRevealed) return;

    const newGrid = [...grid];
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setFlagCount(flagCount + (newGrid[row][col].isFlagged ? -1 : 1));
    setGrid(newGrid);
  }

  // Reveal a cell and, if no adjacent mines, implement Auto Clear by recursively revealing cells
  function revealCell(grid, row, col) {
    if (row < 0 || col < 0 || row >= config.size || col >= config.size || grid[row][col].isRevealed || grid[row][col].isMine) return;

    grid[row][col].isRevealed = true;

    if (grid[row][col].adjacentMines === 0) {
      getNeighbors(row, col).forEach(([r, c]) => revealCell(grid, r, c));
    }
  }

  // Get all valid neighboring cells for a given cell
  function getNeighbors(row, col) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    return directions
      .map(([dr, dc]) => [row + dr, col + dc])
      .filter(([r, c]) => r >= 0 && r < config.size && c >= 0 && c < config.size);
  }

  // Show all mines if the game is over
  function revealAllMines(grid) {
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      });
    });
  }

  // Check if the player has won by revealing all non-mine cells
  function checkWin(grid) {
    return grid.flat().every(cell => cell.isMine || cell.isRevealed);
  }

  // Reset the game state and initialize a new grid
  function resetGame() {
    setIsGameOver(false);
    setHasWon(false);
    setIsFirstClick(true);
    initializeGrid(); // This will set up an empty grid initially
  }

  // Render the Minesweeper game
  return (
    <div>
      <h1>{isGameOver ? "Game Over" : hasWon ? "You Won!" : "Minesweeper"}</h1>
      <h2>Flags remaining: {flagCount}</h2>
      <button onClick={resetGame}>Reset</button>
      <div className="board" style={{ gridTemplateColumns: `repeat(${config.size}, 1fr)` }}>
        {grid.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <Cell
              key={`${rIndex}-${cIndex}`}
              isRevealed={cell.isRevealed}
              isMine={cell.isMine}
              adjacentMines={cell.adjacentMines}
              isFlagged={cell.isFlagged}
              onClick={() => handleClick(rIndex, cIndex)}
              onContextMenu={(e) => handleRightClick(e, rIndex, cIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Game;
