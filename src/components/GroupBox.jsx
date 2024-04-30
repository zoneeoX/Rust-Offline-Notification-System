import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { removeGroup } from "../features/groupSlice";
import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import PlayerBox from "./PlayerBox";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import PlayerModal from "./PlayerModal";
import { FaMap, FaDownload } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";

const GroupBox = ({
  item,
  serverId,
  serverName,
  idx,
  address,
  headerImage,
  rustDetails,
}) => {
  const [name, setName] = useState("");
  const [isChangeName, setIsChangeName] = useState(false);
  const [activePlayers, setActivePlayers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1);
  const [isHover, setIsHover] = useState(false);
  const [isOpenPlayerModal, setIsOpenPlayerModal] = useState(false);
  const [allPlayer, setAllPlayer] = useState("");
  const { arrOfGroup } = useSelector((state) => state.group);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  const inputRef = useRef(null);
  const activePlayersRef = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const allPlayersOffline = activePlayers.length === 0;

    const wasAnyPlayerOnline = activePlayersRef.current.length > 0;

    if (allPlayersOffline && wasAnyPlayerOnline && isPlayerLoaded) {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(serverName, {
          body: item?.map(({ label }) => label).join(", ") + " Are offline!",
          icon: "/icon.jpg",
        });
      } else if (
        "Notification" in window &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(serverName, {
              body:
                item?.map(({ label }) => label).join(", ") + " Are offline!",
              icon: "/icon.jpg",
            });
          }
        });
      }
    }

    activePlayersRef.current = activePlayers;
  }, [activePlayers, isPlayerLoaded, item, serverName]);

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
      setAllPlayer(playerList);
      setActivePlayers(
        playerList
          .filter(({ id }) => item.some(({ value }) => value === id))
          .map((player) => player.id)
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsPlayerLoaded(true);
    }
  };

  function openPlayerInfo() {
    setIsHover(!isHover);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [item, serverId]);

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

  function handleRemove() {
    dispatch(removeGroup(idx));
  }

  function openPlayerModal() {
    setIsOpenPlayerModal(true);
  }

  function closePlayerModal() {
    setIsOpenPlayerModal(false);
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("copied:", text);
      })
      .catch((error) => {
        console.error("Faileed", error);
      });
  }

  const exportGroupData = (idx) => {
    const groupData = arrOfGroup.find((group, index) => index === idx);

    if (groupData) {
      const json = JSON.stringify(groupData);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `group_rustoffnotifier_data_${idx}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      console.error(
        "Group data is not found, please report if there is any bug!"
      );
    }
  };

  function handleOutOfFocus() {
    setIsChangeName(false);
  }

  return (
    <>
      {isOpenPlayerModal && (
        <PlayerModal
          closePlayerModal={closePlayerModal}
          playerList={allPlayer}
          idx={idx}
        />
      )}

      <div
        className={`w-full bg-[#272A21] hover:bg-[#2c3026] text-white transition-all h-full flex flex-col justify-between group relative p-4`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-between mb-5">
            <div className="flex flex-row gap-2">
              <button
                className="absolute p-2 mb-4 text-white transition-all rounded-full opacity-0 -right-5 -top-5 bg-neutral-500/50 hover:bg-neutral-300/50 w-fit group-hover:opacity-100"
                onClick={() => handleRemove()}
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
                      onBlur={handleOutOfFocus}
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
                <PlayerBox
                  key={value}
                  isPlayerActive={isPlayerActive}
                  value={value}
                  label={label}
                  openPlayerInfo={openPlayerInfo}
                  itemLength={item?.length}
                  playerIDX={i}
                  groupIDX={idx}
                  isPlayerLoaded={isPlayerLoaded}
                />
              );
            })}

            <div
              className="font-oswald bg-[#21241C] hover:bg-[#303529] cursor-pointer min-h-fit max-h-full outline-dotted outline-[1px] outline-white/50 flex justify-center items-center"
              onClick={() => openPlayerModal()}
            >
              <span className="transition-all text-neutral-500">
                <FaPlus />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-end">
          <a href={rustDetails?.url} target="_blank" rel="noopener noreferrer">
            <span className="flex items-center justify-end p-2 opacity-50 cursor-pointer hover:opacity-100">
              <FaMap />
            </span>
          </a>

          <a onClick={() => copyToClipboard(address)}>
            <span className="flex items-center justify-end p-2 opacity-50 cursor-pointer hover:opacity-100">
              <FaCopy />
            </span>
          </a>

          <span
            className="flex items-center justify-end p-2 opacity-50 cursor-pointer hover:opacity-100"
            onClick={() => exportGroupData(idx)}
          >
            <FaDownload />
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <h1 className="text-center opacity-50 font-oswald">{serverName}</h1>
          </div>
          <h1 className="font-light opacity-50">
            {timeLeft} seconds left until data refreshes
          </h1>
        </div>
      </div>
    </>
  );
};

export default GroupBox;
