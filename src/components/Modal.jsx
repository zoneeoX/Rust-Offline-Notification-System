import React, { useEffect, useState } from "react";
import PlayerOverlay from "./PlayerOverlay";
import PlayerCard from "./PlayerCard";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { addGroup } from "../features/groupSlice";
import { IoMdClose } from "react-icons/io";

const Modal = ({ setIsModal }) => {
  const [name, setName] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectPlayers, setSelectPlayers] = useState();
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();

  function closeModal() {
    setIsModal(false);
  }

  const { playerList, isLoading, isError } = useSelector(
    (state) => state.players
  );
  const { arrOfGroup } = useSelector((state) => state.group);

  useEffect(() => {
    const options = playerList.map((player) => ({
      value: player.attributes.id,
      label: player.attributes.name,
    }));

    setSelectOptions(options);
  }, [playerList]);

  const handleChange = (selectedOptions) => {
    setSelectPlayers(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      dispatch(addGroup(selectPlayers));
    } catch (err) {
      console.log(err);
    } finally {
      console.log(arrOfGroup);
      setSelectPlayers([]);
    }
  };

  return (
    <div className="fixed z-20 flex items-center justify-center w-screen h-screen overflow-hidden bg-black/30 font-oswald">
      <div className="w-[30vw] h-fit bg-[#272A21] p-6 relative rounded-2xl">
        <button onClick={closeModal}>
          <span className="text-4xl text-white ">
            <IoMdClose />
          </span>
        </button>
        <form
          className="flex flex-col h-[35vh] justify-between mt-2"
          onSubmit={handleSubmit}
        >
          <Select
            options={selectOptions}
            components={animatedComponents}
            value={selectPlayers}
            isMulti={true}
            onChange={handleChange}
            closeMenuOnSelect={false}
          />

          <button
            type="submit"
            className="text-white text-2xl bg-[#21241C] mt-2 rounded-full p-2 hover:bg-[#21241C]/50 transition-all"
          >
            Add to group
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
