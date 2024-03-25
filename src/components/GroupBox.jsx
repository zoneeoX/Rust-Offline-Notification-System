import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const GroupBox = ({ item }) => {
  const [name, setName] = useState("");
  const [isChangeName, setIsChangeName] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { playerList, isLoading, isError } = useSelector(
    (state) => state.players
  );

  useEffect(() => {
    if (isChangeName && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChangeName]);

  function handleName() {
    setIsChangeName((prevState) => !prevState);
  }

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsChangeName(false);
    }
  };



  return (
    <div className="w-[30vw] bg-[#272A21] p-4 text-white hover:scale-105 transition-all">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="font-oswald text-2xl text-white/50">Members</h1>
        <h1 className="text-2xl font-oswald text-white/50">
          {item.length} Players
        </h1>
      </div>

      <div className="grid grid-cols-3 grid-rows-2 text-center pt-2 gap-2">
        {item?.map(({ value, label }, i) => {
          const found = playerList.find((player) => player.id === value);
          const textColor = found ? "text-white/50" : "text-red-500";
        

          return (
            <div key={i} className="font-oswald bg-[#21241C] px-2">
              <h1
                className={`text-lg overflow-hidden ${textColor} border-white/50 rounded-2xl`}
              >
                {label}
              </h1>
            </div>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-center">
        {!isChangeName ? (
          <h1
            onClick={handleName}
            className="font-oswald text-3xl mt-5 text-white/50 cursor-pointer"
          >
            {name ? name : "Click me to change name."}
          </h1>
        ) : (
          <input
            ref={inputRef}
            placeholder="Type anything here..."
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            className="font-oswald text-3xl text-center mt-5 text-white/50 cursor-pointer bg-[#272A21] outline-none border-none"
            autoFocus
          />
        )}
      </div>
    </div>
  );
};

export default GroupBox;
