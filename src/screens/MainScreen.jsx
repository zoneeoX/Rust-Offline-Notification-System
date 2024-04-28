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

const MainScreen = () => {
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState("");
  const [serverId, setServerId] = useState("");
  const [serverName, setServerName] = useState("");
  const [address, setAddress] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [rustDetails, setRustDetails] = useState("");

  const [isPicked, setIsPicked] = useState(false);
  const { arrOfGroup } = useSelector((state) => state.group);
  const { serverList, isLoading } = useSelector((state) => state.server);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServer(name));
  }, [name]);

  useEffect(() => {
    fetchPlayersAmountOfTimeSomething();
  }, [isPicked]);

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
        <AddTopBar setIsModal={setIsModal} changeIsPicked={changeIsPicked} />
      ) : (
        ""
      )}

      {!isPicked && (
        <div>
          <h1 className="p-4 px-4 text-4xl text-white font-oswald">
            Server List
          </h1>

          <div className="grid grid-cols-1 gap-2 p-4 text-white font-oswald">
            <div className="flex flex-col text-white">
              <p className="opacity-50 text-md">Search</p>
              <input
                className="bg-[#272A21] outline-none w-52 h-7 rounded-lg font-light"
                onChange={(e) => debounceOnChange(e)}
              />
            </div>
            <div className="h-10 cursor-pointer text-white/50">
              <div className="w-full px-2 bg-[#272A21] hover:bg-[#3c4133] flex flex-row justify-between items-center h-10">
                <div className="flex flex-row gap-2">
                  <span className="text-2xl">Rank</span>
                  <span className="text-2xl">Name</span>
                </div>
                <span className="text-2xl">Players</span>
              </div>
            </div>

            {isLoading
              ? Array(26)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="w-screen h-10 rounded-md bg-[#272A21] animate-pulse"
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
                    <div className="w-full px-2 bg-[#272A21] hover:bg-[#3c4133] flex flex-row justify-between items-center h-10 rounded-md">
                      <div className="flex flex-row gap-2">
                        <span className="w-10 text-xl">
                          #{item.attributes.rank}
                        </span>
                        <span className="text-xl">{item.attributes.name}</span>
                      </div>
                      <span className="text-xl">
                        {item.attributes.players} / {item.attributes.maxPlayers}
                      </span>
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
          <GroupOverlay>
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
          </GroupOverlay>
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
