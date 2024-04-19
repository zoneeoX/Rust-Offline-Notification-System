import React from 'react'

const AddTopBar = ({setIsModal}) => {

    function openModal(){
        setIsModal(true)
    }

  return (
    <div className='z-10 p-4'>
        <button className='flex flex-col px-2 py-1 text-3xl transition-all text-white/50 font-oswald hover:text-white' onClick={openModal}>
            Create group
        </button>
    </div>
  )
}

export default AddTopBar