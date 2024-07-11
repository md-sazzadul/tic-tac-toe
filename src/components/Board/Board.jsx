import Square from "../Square/Square";

const Board = ({ xIsNext, squares, onPlay, playerX, playerO }) => {
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;

  let status;

  if (winner) {
    status = `Winner: ${winner === "X" ? playerX : playerO}`;
  } else {
    status = "Next Player " + (xIsNext ? playerX : playerO);
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  }

  return (
    <>
      <div>{status}</div>
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
