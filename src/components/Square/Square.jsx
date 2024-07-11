const Square = ({ value, onSquareClick, isWinningSquare }) => {
  return (
    <button
      className={`bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg ${
        isWinningSquare ? "bg-yellow-300" : ""
      }`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;
