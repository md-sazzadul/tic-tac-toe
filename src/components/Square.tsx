import { useState } from "react";
import WinSound from "../assets/click-sound.mp3";

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
      const audio = new Audio(WinSound);
      audio.play();
      onSquareClick();
    }
  }

  return (
    <button
      className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white text-xl sm:text-2xl md:text-3xl font-bold rounded shadow-md transition-all focus:outline-none focus:ring-2 ${
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
