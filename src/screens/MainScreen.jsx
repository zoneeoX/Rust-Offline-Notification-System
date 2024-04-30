import React, { useState, useEffect, useRef } from "react";
import AddTopBar from "../components/AddTopBar";
import debounce from "lodash.debounce";
import GroupOverlay from "../components/GroupOverlay";
import GroupBox from "../components/GroupBox";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../features/fetchPlayers";
import { fetchServer } from "../features/searchServer";
import { FaFileImport } from "react-icons/fa";
import { importData } from "../features/groupSlice";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaMap } from "react-icons/fa";
import { RiLoopLeftFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const MainScreen = () => {
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState("");
  const [serverId, setServerId] = useState("");
  const [serverName, setServerName] = useState("");
  const [address, setAddress] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [rustDetails, setRustDetails] = useState("");
  const [loadedImage, setLoadedImage] = useState(false);

  const [isPicked, setIsPicked] = useState(false);
  const { arrOfGroup } = useSelector((state) => state.group);
  const { serverList, isLoading } = useSelector((state) => state.server);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServer(name));
  }, [name]);

  // useEffect(() => {
  //   fetchPlayersAmountOfTimeSomething();
  // }, [isPicked]);

  useEffect(() => {
    if (isPicked == true) {
      fetchPlayersAmountOfTimeSomething();
    }
  }, [isPicked]);

  function fetchPlayersAmountOfTimeSomething() {
    dispatch(fetchPlayers(serverId));
  }

  function changeIsPicked() {
    setIsPicked(!isPicked);
  }

  const updateSearch = (event) => {
    setName(event.target.value);
  };

  function selectServerId(selectedServerId) {
    setServerId(selectedServerId);
    changeIsPicked();
  }

  function formatTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  }

  const debounceOnChange = debounce(updateSearch, 1000);

  return (
    <div className={`w-screen min-h-screen max-h-full bg-[#151D1C]`}>
      {isModal ? (
        <Modal
          setIsModal={setIsModal}
          serverId={serverId}
          serverName={serverName}
          address={address}
          headerImage={headerImage}
          rustDetails={rustDetails}
        />
      ) : (
        ""
      )}
      {isPicked ? (
        <AddTopBar
          setIsModal={setIsModal}
          changeIsPicked={changeIsPicked}
          serverName={serverName}
        />
      ) : (
        ""
      )}

      {!isPicked && (
        <div>
          <h1 className="p-4 px-4 text-4xl text-white font-oswald">
            Server List
          </h1>

          <div className="flex flex-col px-4 text-white">
            <p className="opacity-50 text-md">Search</p>
            <input
              className="bg-[#272A21] outline-none w-52 h-7 rounded-lg font-light"
              onChange={(e) => debounceOnChange(e)}
            />
          </div>
          <div className="grid grid-cols-1 gap-2 p-4 text-white md:grid-cols-2 lg:grid-cols-4 font-oswald">
            {isLoading
              ? Array(8)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="w-[24vw] h-[20vh] rounded-md bg-[#272A21] animate-pulse"
                    ></div>
                  ))
              : serverList.data?.map((item, key) => (
                  <div
                    key={key}
                    className="font-light cursor-pointer "
                    onClick={() => {
                      selectServerId(item.id);
                      setServerName(item.attributes.name);
                      setAddress(item.attributes.address);
                      setHeaderImage(item.attributes.details.rust_headerimage);
                      setRustDetails(item.attributes.details.rust_maps);
                    }}
                  >
                    <div className="w-full h-full bg-[#272A21] hover:bg-[#3c4133] flex flex-col justify-between items-top rounded-md relative overflow-hidden group">
                      <div className="relative flex items-start justify-center h-32 overflow-hidden">

                        
                        <img
                          src={item.attributes.details.rust_headerimage}
                          className={`opacity-40 group-hover:opacity-75 ${loadedImage ? "visible" : "hidden"}`}
                          onLoad={() => setLoadedImage(true)}
                        />
                      </div>
                      <div className="p-2 opacity-50 group-hover:opacity-100">
                        <h1 className="p-2 text-xl font-semibold text-center truncate text-nowrap">
                          {item.attributes.name}
                        </h1>
                        <p className="flex flex-row items-center gap-2">
                          <span className="text-xl">
                            <BsFillPeopleFill />
                          </span>
                          <span className="w-16">Players</span>
                          {item.attributes.players} /{" "}
                          {item.attributes.maxPlayers}
                        </p>
                        <p className="flex flex-row items-center gap-2">
                          <span className="text-xl">
                            <FaMap />
                          </span>
                          <span className="w-16">Last wipe</span>
                          {formatTimeAgo(
                            item.attributes.details.rust_last_wipe
                          )}
                        </p>
                        <p className="flex flex-row items-center gap-2">
                          <span className="text-xl">
                            <RiLoopLeftFill />
                          </span>

                          <span className="w-16">Map</span>
                          {item.attributes.details.map}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}

      {arrOfGroup?.length == 0 ? (
        ""
      ) : (
        <>
          {!isPicked == true ? (
            <h1 className="p-4 text-4xl text-white font-oswald">
              List of groups
            </h1>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-4">
            {arrOfGroup.map((item, i) => (
              <GroupBox
                key={i}
                item={item.selectPlayers}
                serverId={item.serverId}
                serverName={item.serverName}
                idx={i}
                address={item.address}
                headerImage={item.headerImage}
                rustDetails={item.rustDetails}
              />
            ))}
          </div>
        </>
      )}

      <div className="fixed bottom-0 right-0 z-50 flex flex-col p-5 text-white/50 font-oswald">
        <span className="text-sm text-right font-extralight">
          made by zoneeox.
        </span>
      </div>
    </div>
  );
};

export default MainScreen;
