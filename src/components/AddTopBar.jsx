import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";

const AddTopBar = ({ setIsModal, changeIsPicked }) => {
  function openModal() {
    setIsModal(true);
  }

  function closePage(){
    changeIsPicked()
  }

  return (
    <div className="z-10 p-4 text-white font-oswald">
      <button className="flex flex-col px-2 py-1 text-3xl transition-all text-white/50 hover:text-white" onClick={closePage}>
        <span className="p-2 text-black transition-all rounded-full bg-neutral-200/50 hover:bg-neutral-100">
          <IoChevronBackSharp />
        </span>
      </button>
      <button
        className="flex flex-col px-2 py-1 mt-10 text-3xl transition-all text-white/50 hover:text-white"
        onClick={openModal}
      >
        Create group
      </button>
    </div>
  );
};

export default AddTopBar;
