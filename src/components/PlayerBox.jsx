import { useState, useEffect } from "react";
import axios from "axios";
import { IoChevronBackCircle } from "react-icons/io5";

const PlayerBox = ({
  isPlayerActive,
  value,
  label,
  openPlayerInfo,
  itemLength,
}) => {
  const [player, setPlayer] = useState();
  const [isHover, setIsHover] = useState(false);
  const [playerSwitch, setPlayerSwitch] = useState(0);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://api.battlemetrics.com/players/${value}`,
        {
          params: {
            include: "identifier",
          },
        }
      );
      const playerInfo = response.data["included"];
      setPlayer(playerInfo);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  function handleBack() {
    if (playerSwitch != 0) {
      setPlayerSwitch((prevState) => prevState - 1);
    }
  }

  function handleFront() {
    if (playerSwitch !== itemLength) {
      setPlayerSwitch((prevState) => prevState + 1);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="font-oswald bg-[#21241C] cursor-pointer min-h-fit max-h-full flex flex-row justify-between items-center ">
      <button onClick={handleBack} className="opacity-50 hover:opacity-100">
        <IoChevronBackCircle />
      </button>
      <h1
        className={`text-lg overflow-hidden border-white/50 rounded-2xl font-light flex flex-row items-center ${
          isPlayerActive ? "text-white/50" : "text-red-500"
        }`}
        onClick={() => setIsHover(!isHover)}
      >
        {player?.map((item, i) => (
          <h1>{playerSwitch == i && item?.attributes?.identifier}</h1>
        ))}
      </h1>

      <button
        onClick={handleFront}
        className="rotate-180 opacity-50 hover:opacity-100"
      >
        <IoChevronBackCircle />
      </button>
      {/* {isHover && player && (
        <>
          {player.map((item, i) => (
            <h1 className="truncate opacity-50" key={i}>
              {item?.attributes?.identifier}
            </h1>
          ))}
        </>
      )} */}
    </div>
  );
};

export default PlayerBox;
