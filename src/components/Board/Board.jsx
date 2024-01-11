import { useState } from "react";
import Square from "../Square/Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));

  return (
    <>
      <div className="flex">
        <Square value={squares[0]}></Square>
        <Square value={squares[1]}></Square>
        <Square value={squares[2]}></Square>
      </div>
      <div className="flex">
        <Square value={squares[3]}></Square>
        <Square value={squares[4]}></Square>
        <Square value={squares[5]}></Square>
      </div>
      <div className="flex">
        <Square value={squares[6]}></Square>
        <Square value={squares[7]}></Square>
        <Square value={squares[8]}></Square>
      </div>
    </>
  );
};

export default Board;
