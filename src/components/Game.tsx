import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playerX, setPlayerX] = useState("Player X");
  const [playerO, setPlayerO] = useState("Player O");
  const [isNameSet, setIsNameSet] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function getMoveCoordinates(
    prevSquares: (string | null)[],
    nextSquares: (string | null)[]
  ) {
    for (let i = 0; i < prevSquares.length; i++) {
      if (prevSquares[i] !== nextSquares[i]) {
        return [Math.floor(i / 3) + 1, (i % 3) + 1];
      }
    }
    return [null, null];
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";

    const [row, col] =
      move > 0 ? getMoveCoordinates(history[move - 1], squares) : [null, null];

    return (
      <li key={move}>
        <button
          className={`p-2 rounded ${
            move === currentMove
              ? "bg-blue-200 dark:bg-blue-600 font-bold"
              : "text-blue-500 dark:text-blue-300 hover:underline"
          }`}
          onClick={() => jumpTo(move)}
        >
          {description} {row && col ? `(Row: ${row}, Col: ${col})` : ""}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
      {!isNameSet ? (
        <div className="flex flex-col items-center space-y-4 p-4 border rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 w-full max-w-xs sm:max-w-sm md:max-w-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Enter Player Names
          </h3>
          <input
            type="text"
            placeholder="Player X Name"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Player O Name"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={() => setIsNameSet(true)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div>
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              playerX={playerX}
              playerO={playerO}
            />
          </div>
          <div className="mt-6 p-4 border rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Game History
            </h3>
            <ol className="list-decimal list-inside space-y-2">{moves}</ol>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              setHistory([Array(9).fill(null)]);
              setCurrentMove(0);
              setIsNameSet(false);
            }}
          >
            Restart Game
          </button>
        </>
      )}
    </div>
  );
}
