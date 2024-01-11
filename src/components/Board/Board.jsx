import Square from "../Square/Square";

const Board = () => {
  return (
    <>
      <div className="flex">
        <Square></Square>
        <Square></Square>
        <Square></Square>
      </div>
      <div className="flex">
        <Square></Square>
        <Square></Square>
        <Square></Square>
      </div>
      <div className="flex">
        <Square></Square>
        <Square></Square>
        <Square></Square>
      </div>
    </>
  );
};

export default Board;
