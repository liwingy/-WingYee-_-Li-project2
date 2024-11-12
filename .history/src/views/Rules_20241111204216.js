import React from 'react';

function Rules() {
  return (
    <div>
      <h1>💡Rules of Minesweeper</h1>
      <p>The game board is a grid of cells, some of which contain hidden mines.</p>
      <p>The goal is to reveal all cells that do not contain mines.</p>
      <p>Each cell displays a number representing how many mines are adjacent to it, helping you determine which nearby cells are safe to reveal.</p>
      <p>If you click on a mine, the game ends.🙈</p>
      <p>You win the game by successfully revealing all safe cells without triggering any mines.</p>
      <p>You can restart the game at any time by clicking the "Reset" button. Good Luck😊</p>
    </div>
  );
}

export default Rules;
