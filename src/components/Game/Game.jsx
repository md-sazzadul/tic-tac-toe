import { useCallback, useEffect, useState } from "react";
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

  const [timeLeft, setTimeLeft] = useState(59);
  const [gameFinished, setGameFinished] = useState(false);

  const currentSquares = history[currentMove];

  useEffect(() => {
    if (timeLeft > 0 && !gameFinished) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !gameFinished) {
      setGameFinished(true);
      if (xIsNext) {
        setScoreO(scoreO + 1);
      } else {
        setScoreX(scoreX + 1);
      }
    }
  }, [timeLeft, xIsNext, gameFinished, scoreO, scoreX]);

  const handlePlay = useCallback(
    (nextSquares) => {
      if (gameFinished) return;

      setXIsNext(!xIsNext);
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setTimeLeft(59);

      const winnerInfo = calculateWinner(nextSquares);
      if (winnerInfo) {
        setGameFinished(true);
        if (winnerInfo.winner === "X") {
          setScoreX(scoreX + 1);
        } else {
          setScoreO(scoreO + 1);
        }
      }
    },
    [gameFinished, xIsNext, history, currentMove, scoreO, scoreX]
  );

  const jumpTo = useCallback((move) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
    setTimeLeft(59);
    setGameFinished(false);
  }, []);

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move #${move}`;
    } else {
      description = `Go to start of game`;
    }
    return (
      <li key={move} className="bg-gray-700 text-white mb-1 p-1 rounded-sm">
        <button onClick={() => jumpTo(move)} className="hover:text-yellow-400">
          {description}
        </button>
      </li>
    );
  });

  const handleUndo = useCallback(() => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
      setXIsNext(!xIsNext);
      setTimeLeft(59);
      setGameFinished(false);
    }
  }, [currentMove, xIsNext]);

  const resetGame = useCallback(() => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
    setTimeLeft(59);
    setGameFinished(false);
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-l from-rose-800 to-rose-200 min-h-screen text-white">
      <div className="mb-4 w-full sm:w-auto flex flex-col sm:flex-row justify-center items-center">
        <input
          type="text"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          placeholder="Player X Name"
          className="mr-2 mb-2 sm:mb-0 p-2 rounded-md border border-gray-400 bg-white text-gray-800"
        />
        <input
          type="text"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
          placeholder="Player O Name"
          className="p-2 rounded-md border border-gray-400 bg-white text-gray-800"
        />
      </div>
      <div className="mb-4 text-lg font-bold">
        <div>
          {playerX}: {scoreX}
        </div>
        <div>
          {playerO}: {scoreO}
        </div>
      </div>
      <div className="mb-4 text-xl flex flex-col items-center w-full">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(timeLeft / 59) * 100}%` }}
          ></div>
          <div>Time left: {timeLeft}s</div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center w-full lg:w-auto">
        <div className="mb-4 lg:mr-16 flex justify-center">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            playerX={playerX}
            playerO={playerO}
          />
        </div>
        <div className="flex justify-center w-full lg:w-auto">
          <ol className="border border-gray-400 p-4 rounded-lg bg-gray-800 w-full lg:w-auto">
            {moves}
          </ol>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="bg-white-500 text-white py-2 px-4 rounded mr-2 shadow-md hover:bg-red-700 transition duration-300"
          onClick={resetGame}
        >
          Reset Game
        </button>
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 transition duration-300"
          onClick={handleUndo}
        >
          Undo
        </button>
      </div>
    </div>
  );
};

export default Game;
