function Cell({ isRevealed, isMine, adjacentMines, isFlagged, onClick, onRightClick }) {
  const content = isRevealed ? (isMine ? '💣' : adjacentMines || '') : (isFlagged ? '🚩' : '');

  return (
    <div
      className={`cell ${isRevealed ? 'revealed' : ''}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {content}
    </div>
  );
}
