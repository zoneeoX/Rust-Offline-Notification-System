import React, { useEffect, useState } from 'react';
import PlayerOverlay from './PlayerOverlay';
import PlayerCard from './PlayerCard';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { addGroup } from '../features/groupSlice';

const Modal = ({ setIsModal }) => {
  const [name, setName] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectPlayers, setSelectPlayers] = useState();
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();

  function closeModal() {
    setIsModal(false);
  }

  const { playerList, isLoading, isError } = useSelector((state) => state.players);
  const { arrOfGroup } = useSelector((state) => state.group)

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
    
    try{
        dispatch(addGroup(selectPlayers));
    } catch(err){
        console.log(err)
    } finally{
        console.log(arrOfGroup)
        setSelectPlayers([]);
    }

  };

  return (
    <div className='w-screen h-screen fixed bg-slate-500/80 flex justify-center items-center'>
      <div className='w-[40vw] h-[40vh] bg-slate-100 p-2'>
        <button onClick={closeModal}>Close Modal</button>
        <form className='flex flex-col h-[32vh] p-4' onSubmit={handleSubmit}>
          <Select
            options={selectOptions}
            components={animatedComponents}
            value={selectPlayers}
            isMulti={true}
            onChange={handleChange}
            closeMenuOnSelect={false}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
