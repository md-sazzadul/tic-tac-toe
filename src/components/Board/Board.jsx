import { calculateWinner } from "../../utils";
import Square from "../Square/Square";

const clickSound = new Audio("/public/sounds/click.wav");
const winSound = new Audio("/public/sounds/win.mp3");

const Board = ({
  xIsNext,
  squares,
  onPlay,
  playerX,
  playerO,
  soundEnabled,
}) => {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;

  let status;

  if (winner) {
    status = `Winner: ${winner === "X" ? playerX : playerO}`;
    if (soundEnabled) winSound.play();
  } else {
    status = "Next Player " + (xIsNext ? playerX : playerO);
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    if (soundEnabled) clickSound.play();
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  }

  return (
    <div className="w-full max-w-xs sm:max-w-md">
      <div className="text-lg sm:text-xl font-semibold mb-4 text-center">
        {status}
      </div>
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
    </div>
  );
};

export default Board;
