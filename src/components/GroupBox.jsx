import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { removeGroup } from "../features/groupSlice";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import PlayerBox from "./PlayerBox";
import PlayerInfo from "./PlayerInfo";

const GroupBox = ({ item, serverId, serverName, idx }) => {
  const [name, setName] = useState("");
  const [isChangeName, setIsChangeName] = useState(false);
  const [activePlayers, setActivePlayers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isHover, setIsHover] = useState(false);
  
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.battlemetrics.com/servers/${serverId}`,
        {
          params: {
            include: "player",
          },
        }
      );
      const playerList = response.data.included;
      setActivePlayers(
        playerList
          .filter(({ id }) => item.some(({ value }) => value === id))
          .map((player) => player.id)
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  function openPlayerInfo(){
    setIsHover(!isHover)
  }


  useEffect(() => {
    fetchData();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchData();
  }, [item, serverId]);

  useEffect(() => {
    if (timeLeft === 0) {
      fetchData();
      setTimeLeft(60);
    }
  }, [timeLeft]);

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

  function handleDelete() {
    dispatch(removeGroup(idx));
  }

  return (
    <div
      className={`w-[30vw] bg-[#272A21] p-4 text-white transition-all h-full flex flex-col justify-between`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row justify-between mb-5">
          <div className="flex flex-row gap-2">
            <button
              className="p-2 mb-4 text-white transition-all rounded-full bg-neutral-500/50 hover:bg-neutral-300/50 w-fit"
              onClick={handleDelete}
            >
              <span className="pb-10 text-2xl text-white/50">
                <IoClose />
              </span>
            </button>
            <div>
              <div className="flex items-center justify-center w-full mt-1">
                {!isChangeName ? (
                  <h1
                    onClick={handleName}
                    className="flex items-end gap-2 text-2xl cursor-pointer font-oswald text-white/50"
                  >
                    <span>{name ? name : "Members"}</span>
                  </h1>
                ) : (
                  <input
                    ref={inputRef}
                    placeholder="Type anything here..."
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    className="font-oswald text-2xl text-start text-white/50 cursor-pointer bg-[#272A21] outline-none border-none"
                    autoFocus
                  />
                )}
              </div>
            </div>
          </div>

          <h1 className="mt-1 text-2xl font-oswald text-white/50">
            {activePlayers.length} / {item?.length} Players
          </h1>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-2 pt-2 text-center">
          {item?.map(({ value, label }, i) => {
            const isPlayerActive = activePlayers.includes(value);
            return (
              <>
              <PlayerBox isPlayerActive={isPlayerActive} value={value} label={label} openPlayerInfo={openPlayerInfo} itemLength={item?.length} />
              </>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="mt-10 text-center opacity-50 font-oswald">
          {serverName}
        </h1>
        <h1 className="font-light opacity-50">
          {timeLeft} seconds left until data refreshes
        </h1>
      </div>
    </div>
  );
};

export default GroupBox;
