interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare?: boolean;
}

export default function Square({
  value,
  onSquareClick,
  isWinningSquare = false,
}: SquareProps) {
  return (
    <button
      className={`w-16 h-16 text-2xl font-bold rounded shadow-md transition-all focus:outline-none focus:ring-2 ${
        isWinningSquare ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
      } focus:ring-blue-300`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
