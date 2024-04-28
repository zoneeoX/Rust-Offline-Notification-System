import React, { useRef } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdPeopleOutline } from "react-icons/md";
import { importData } from "../features/groupSlice";
import { useDispatch } from "react-redux";
import { FaFileImport } from "react-icons/fa";

const AddTopBar = ({ setIsModal, changeIsPicked }) => {
  const dispatch = useDispatch();

  function openModal() {
    setIsModal(true);
  }

  function closePage() {
    changeIsPicked();
  }

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      dispatch(importData(importedData));
    };
    reader.readAsText(file);
  };

  const fileInputRef = useRef(null);

  const handleImportButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="z-10 p-4 text-white font-oswald">
      <button
        className="flex flex-col px-2 py-1 text-3xl transition-all text-white/50 hover:text-white"
        onClick={closePage}
      >
        <span className="p-2 text-black transition-all rounded-full bg-neutral-200/50 hover:bg-neutral-100">
          <IoChevronBackSharp />
        </span>
      </button>

      <div className="flex flex-row gap-2 mt-10">
        <button
          className="flex flex-row items-center justify-center gap-2 p-2 text-white rounded-full cursor-pointer bg-neutral-700 hover:bg-neutral-600 w-36"
          onClick={openModal}
        >
          <span className="text-2xl">
            <MdPeopleOutline />
          </span>
          Create group
        </button>
        <button>
          <input
            type="file"
            accept=".json"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImportData}
          />
          <h1
            className="flex flex-row items-center justify-center gap-2 p-2 text-center text-white rounded-full cursor-pointer w-36 bg-neutral-700 hover:bg-neutral-600 font-oswald"
            onClick={handleImportButtonClick}
          >
            <span>
              <FaFileImport />
            </span>
            <span>Import data</span>
          </h1>
        </button>
      </div>
    </div>
  );
};

export default AddTopBar;
