import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
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

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";

    return (
      <li key={move}>
        <button
          className={`${
            move === currentMove
              ? "font-bold underline"
              : "text-blue-500 hover:underline"
          }`}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="mt-6 p-4 border rounded bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Game History</h3>
        <ol className="list-decimal list-inside space-y-2">{moves}</ol>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => {
          setHistory([Array(9).fill(null)]);
          setCurrentMove(0);
        }}
      >
        Restart Game
      </button>
    </div>
  );
}
