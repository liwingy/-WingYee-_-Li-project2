
import React, { createContext, useContext, useState } from 'react';

// Create the context
const GameContext = createContext();

// Custom hook to use the GameContext
export function useGameContext() {
  return useContext(GameContext);
}

// Provider component
export function GameProvider({ children }) {
  // Move state from Game component to this context provider
  const [grid, setGrid] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [flagCount, setFlagCount] = useState(0);

  // Game reset function to initialize the grid and reset flags
  const resetGame = (config) => {
    // Initialize an empty grid based on config size
    const emptyGrid = Array.from({ length: config.size }, () =>
      Array.from({ length: config.size }, () => ({
        isRevealed: false,
        isMine: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );
    setGrid(emptyGrid);
    setIsGameOver(false);
    setFlagCount(config.mines);
  };

  return (
    <GameContext.Provider value={{ grid, setGrid, isGameOver, setIsGameOver, flagCount, setFlagCount, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}
