import React from 'react';

function Cell({ isRevealed, isMine, adjacentMines, onClick }) {
  const content = isRevealed ? (isMine ? '💣' : adjacentMines || '') : '';

  return (
    <div className={`cell ${isRevealed ? 'revealed' : ''}`} onClick={onClick}>
      {content}
    </div>
  );
}

export default Cell;
