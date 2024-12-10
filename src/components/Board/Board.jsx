import { calculateWinner } from "../../utils";
import Square from "../Square/Square";

const clickSound = new Audio("/public/sounds/click.wav");
const winSound = new Audio("/public/sounds/win.mp3");

const Board = ({ xIsNext, squares, onPlay, playerX, playerO }) => {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;

  let status;

  if (winner) {
    status = `Winner: ${winner === "X" ? playerX : playerO}`;
    winSound.play();
  } else {
    status = "Next Player " + (xIsNext ? playerX : playerO);
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    clickSound.play();
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="text-xl font-semibold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
            isWinningSquare={winnerInfo?.line.includes(i)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
