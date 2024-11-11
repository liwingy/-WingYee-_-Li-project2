import React from 'react';

function Cell({ isRevealed, isMine, adjacentMines, isFlagged, onClick, onContextMenu }) {
  return (
    <div
      className={`cell ${isRevealed ? "revealed" : ""}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {isRevealed && isMine ? "💣" : isFlagged ? "🚩" : isRevealed && adjacentMines > 0 ? adjacentMines : ""}
    </div>
  );
}

export default Cell;
