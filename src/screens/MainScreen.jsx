import React, { useState, useEffect } from "react";
import AddTopBar from "../components/AddTopBar";
import GroupOverlay from "../components/GroupOverlay";
import GroupBox from "../components/GroupBox";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../features/fetchPlayers";

const MainScreen = () => {
  const [isModal, setIsModal] = useState(false);
  const { arrOfGroup } = useSelector((state) => state.group);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
  });

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
          <GroupBox item={item} />
        ))}
      </GroupOverlay>
    </div>
  );
};

export default MainScreen;
