import { calculateWinner } from "../utils/calculateWinner";
import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i: number) {
    if (squares[i] || winner) {
      return; // Square already occupied, do nothing
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  const [winner, winningLine] = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className="text-center text-lg font-semibold mb-4">{status}</div>
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
