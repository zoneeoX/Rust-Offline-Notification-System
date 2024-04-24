import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { removeGroup } from "../features/groupSlice";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import PlayerBox from "./PlayerBox";
import { BsFillPeopleFill } from "react-icons/bs";

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

  function openPlayerInfo() {
    setIsHover(!isHover);
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
      className={`w-full bg-[#272A21] hover:bg-[#2c3026] p-4 text-white transition-all h-full flex flex-col justify-between relative group`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row justify-between mb-5">
          <div className="flex flex-row gap-2">
              <button
                className="absolute p-2 mb-4 text-white transition-all rounded-full opacity-0 -right-5 -top-5 bg-neutral-500/50 hover:bg-neutral-300/50 w-fit group-hover:opacity-100"
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
                    className="flex items-center gap-2 text-2xl cursor-pointer font-oswald text-white/50 hover:text-white"
                  >
                    <span className="p-2 bg-neutral-500/50 rounded-xl">
                      <BsFillPeopleFill />
                    </span>
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

          <h1 className="flex flex-row items-center mt-1 font-oswald text-white/50">
            <span className="p-1">
              <BsFillPeopleFill />
            </span>
            <span>
              {activePlayers.length}/{item?.length} Players
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 grid-rows-2 gap-2 pt-2 text-center lg:grid-cols-3">
          {item?.map(({ value, label }, i) => {
            const isPlayerActive = activePlayers.includes(value);
            return (
              <>
                <PlayerBox
                  isPlayerActive={isPlayerActive}
                  value={value}
                  label={label}
                  openPlayerInfo={openPlayerInfo}
                  itemLength={item?.length}
                />
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
