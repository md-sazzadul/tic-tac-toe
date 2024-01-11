import React, { useState } from "react";
import Board from "../Board/Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    setHistory([...history, nextSquares]);
  }

  return (
    <div>
      <div>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        ></Board>
      </div>
      <div>
        <ol></ol>
      </div>
    </div>
  );
};

export default Game;
