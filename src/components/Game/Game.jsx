import { useState } from "react";
import { calculateWinner } from "../../utils";
import Board from "../Board/Board";

const Game = () => {
  const [playerX, setPlayerX] = useState("Player X");
  const [playerO, setPlayerO] = useState("Player O");

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winnerInfo = calculateWinner(nextSquares);
    if (winnerInfo) {
      if (winnerInfo.winner === "X") {
        setScoreX(scoreX + 1);
      } else {
        setScoreO(scoreO + 1);
      }
    }
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the game`;
    }
    return (
      <li key={move} className="bg-gray-700 text-white mb-1 p-1 rounded-sm">
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <input
          type="text"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          placeholder="Player X Name"
          className="mr-2 p-1 border border-gray-400"
        />
        <input
          type="text"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
          placeholder="Player O Name"
          className="p-1 border border-gray-400"
        />
      </div>
      <div className="mb-4">
        <div>
          {playerX}: {scoreX}
        </div>
        <div>
          {playerO}: {scoreO}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mr-16">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            playerX={playerX}
            playerO={playerO}
          ></Board>
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => {
              setHistory([Array(9).fill(null)]);
              setCurrentMove(0);
              setXIsNext(true);
            }}
          >
            Reset Game
          </button>
        </div>
        <div>
          <ol className="border border-gray-400 p-1 text-lg">{moves}</ol>
        </div>
      </div>
    </div>
  );
};

export default Game;
