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
      <div className="flex">
        {[0, 1, 2].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            isWinningSquare={winnerInfo?.line.includes(i)}
          />
        ))}
      </div>
      <div className="flex">
        {[3, 4, 5].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            isWinningSquare={winnerInfo?.line.includes(i)}
          />
        ))}
      </div>
      <div className="flex">
        {[6, 7, 8].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            isWinningSquare={winnerInfo?.line.includes(i)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
