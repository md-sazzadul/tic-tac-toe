import Square from "./Square";

export default function Board() {
  return (
    <div className="grid grid-cols-3 gap-2 w-48 mx-auto mt-10">
      <Square value="1" />
      <Square value="2" />
      <Square value="3" />
      <Square value="4" />
      <Square value="5" />
      <Square value="6" />
      <Square value="7" />
      <Square value="8" />
      <Square value="9" />
    </div>
  );
}
