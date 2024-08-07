const Square = ({ value, onSquareClick, isWinningSquare }) => {
  return (
    <button
      className={`h-12 w-12 m-1 leading-9 text-lg font-bold border border-gray-400 rounded-md shadow-md transition duration-300 ${
        isWinningSquare
          ? "bg-yellow-300 text-gray-800"
          : "bg-white text-gray-800"
      } hover:bg-gray-200`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;
