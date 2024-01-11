import { useState } from "react";
import Square from "../Square/Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={handleClick}></Square>
        <Square value={squares[1]} onSquareClick={handleClick}></Square>
        <Square value={squares[2]} onSquareClick={handleClick}></Square>
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={handleClick}></Square>
        <Square value={squares[4]} onSquareClick={handleClick}></Square>
        <Square value={squares[5]} onSquareClick={handleClick}></Square>
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={handleClick}></Square>
        <Square value={squares[7]} onSquareClick={handleClick}></Square>
        <Square value={squares[8]} onSquareClick={handleClick}></Square>
      </div>
    </>
  );
};

export default Board;
