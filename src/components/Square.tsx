interface SquareProps {
  value: string;
}

export default function Square({ value }: SquareProps) {
  return (
    <button className="w-16 h-16 bg-blue-500 text-white text-2xl font-bold rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all">
      {value}
    </button>
  );
}
