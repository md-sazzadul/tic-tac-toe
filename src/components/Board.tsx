import Square from "./Square";

export default function Board() {
  return (
    <div className="grid grid-cols-3 gap-2 w-48 mx-auto mt-10">
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  );
}
