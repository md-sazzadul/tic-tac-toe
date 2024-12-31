import { useState } from "react";

export default function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue("X");
  }

  return (
    <button
      className="w-16 h-16 bg-blue-500 text-white text-2xl font-bold rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
