import React from 'react';

function Rules() {
  return (
    <div>
      <h1>Rules of Minesweeper</h1>
      <p>The board is made up of cells, with mines randomly scattered across it.</p></>
      <p>To win, open all cells that do not contain mines. Each number displayed on a cell represents how many mines are adjacent to it.</p>
      <p>Use these numbers to identify which cells are safe to open and which may contain mines. You can mark suspected mines by placing a flag with a right-click.</p>
      <p>To start a new game, click the smiley face at the top of the board or press the space bar. The remaining mine count is displayed in the bottom-left corner, while the game timer is on the right.</p>
    </div>
  );
}

export default Rules;
