const Square = ({ value }) => {
  function handleClick() {}

  return (
    <button
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg"
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Square;
