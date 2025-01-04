import { useState } from "react";

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare: boolean;
}

export default function Square({
  value,
  onSquareClick,
  isWinningSquare,
}: SquareProps) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (!value) {
      setClicked(true);
      onSquareClick();
    }
  }

  return (
    <button
      className={`w-16 h-16 text-white text-2xl font-bold rounded shadow-md transition-all focus:outline-none focus:ring-2 ${
        isWinningSquare
          ? "animate-pulse bg-green-500 dark:bg-green-700"
          : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
      } ${
        clicked ? "animate-pop" : ""
      } focus:ring-blue-300 dark:focus:ring-blue-600`}
      onClick={handleClick}
      onAnimationEnd={() => setClicked(false)}
    >
      {value}
    </button>
  );
}
