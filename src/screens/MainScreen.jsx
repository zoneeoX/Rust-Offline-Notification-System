import React, { useState, useEffect } from "react";
import AddTopBar from "../components/AddTopBar";
import GroupOverlay from "../components/GroupOverlay";
import GroupBox from "../components/GroupBox";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../features/fetchPlayers";
import { clearInterval, clearTimeout, setInterval, setTimeout } from 'worker-timers';

const MainScreen = () => {
  const [isModal, setIsModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const { arrOfGroup } = useSelector((state) => state.group);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
      if (timeLeft === 0) {
        fetchPlayersAmountOfTimeSomething();
        setTimeLeft(60); 
      }
    }, 1000); 
    return () => {
      clearInterval(intervalId); 
    };
  }, [timeLeft]); 

  function fetchPlayersAmountOfTimeSomething(){
    dispatch(fetchPlayers());
  }

  return (
    <div
      className={`w-screen min-h-screen max-h-full bg-[#151D1C] ${
        arrOfGroup.length === 0 ? "flex justify-center items-center" : ""
      }`}
    >
      {isModal ? <Modal setIsModal={setIsModal} /> : ""}

      <AddTopBar setIsModal={setIsModal} />

      <GroupOverlay>
        {arrOfGroup.map((item, i) => (
          <GroupBox key={i} item={item} />
        ))}
      </GroupOverlay>

      <div className="fixed bottom-0 right-0 p-5 text-white/50 font-oswald">
        Refreshes player data in {timeLeft} seconds
      </div>
    </div>
  );
};

export default MainScreen;
