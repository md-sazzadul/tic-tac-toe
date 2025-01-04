import { useEffect } from "react";
import WinSound from "../assets/win-sound.mp3";
import { calculateWinner } from "../utils/calculateWinner";
import Square from "./Square";

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  playerX: string;
  playerO: string;
}

export default function Board({
  xIsNext,
  squares,
  onPlay,
  playerX,
  playerO,
}: BoardProps) {
  const [winner, winningLine] = calculateWinner(squares);

  useEffect(() => {
    if (winner) {
      const winAudio = new Audio(WinSound);
      winAudio.play();
    }
  }, [winner]);

  function handleClick(i: number) {
    if (squares[i] || winner) {
      return; // Square already occupied, do nothing
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  const isDraw = !winner && squares.every((square) => square !== null);

  const status = winner
    ? `Winner: ${winner === "X" ? playerX : playerO}!`
    : isDraw
    ? "Game is a Draw!"
    : `Next Player: ${xIsNext ? playerX : playerO}`;

  return (
    <div>
      <div
        className={`text-center text-lg font-semibold mb-4 ${
          winner
            ? "text-green-600 dark:text-green-400 animate-bounce"
            : "text-gray-800 dark:text-gray-200"
        }`}
      >
        {status}
      </div>
      <div className="grid grid-cols-3 gap-2 w-48 mx-auto mt-10">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            isWinningSquare={winningLine?.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}
