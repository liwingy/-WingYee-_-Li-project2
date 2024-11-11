import React from 'react';

function Cell({ isRevealed, isMine, adjacentMines, onClick }) {
  let content = '';
  if (isRevealed) {
    content = isMine ? '💣' : (adjacentMines > 0 ? adjacentMines : '');
  }

  return (
    <div
      className={`cell ${isRevealed ? 'revealed' : ''}`}
      onClick={onClick}
    >
      {content}
    </div>
  );
}

export default Cell;
