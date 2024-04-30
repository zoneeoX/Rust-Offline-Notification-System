import { useState, useEffect } from "react";
import axios from "axios";
import { IoChevronBackCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";
import { removePlayer } from "../features/groupSlice";

const PlayerBox = ({
  isPlayerActive,
  value,
  label,
  openPlayerInfo,
  itemLength,
  playerIDX,
  groupIDX,
  isPlayerLoaded
}) => {
  const [player, setPlayer] = useState();
  const [isHover, setIsHover] = useState(false);
  const [playerSwitch, setPlayerSwitch] = useState(0);

  const dispatch = useDispatch();

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

  function handleRemovePlayer() {
    dispatch(removePlayer({ playerIDX, groupIDX }));
  }

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
    <div className="font-oswald bg-[#21241C] cursor-pointer text-nowrap relative z-20 group">
      <span
        className="absolute text-xl transition-all opacity-0 text-neutral-500 hover:text-red-600 -right-2 -top-2 group-hover:opacity-100"
        onClick={() => handleRemovePlayer()}
      >
        <IoCloseCircleOutline />
      </span>
      <h1
        className={`text-lg overflow-hidden border-white/50 rounded-2xl font-light ${
          isPlayerActive ? "text-white/50" : "text-red-500"
        }`}
        onClick={() => setIsHover(!isHover)}
      >
        {/* {player?.map((item, i) => (
          <h1>{playerSwitch == i && item?.attributes?.identifier}</h1>
        ))} */}
        {isPlayerLoaded ? (
          label
        ) : "Player data is still on load."}
      </h1>

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
