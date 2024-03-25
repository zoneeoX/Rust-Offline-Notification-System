import React from 'react'

const AddTopBar = ({setIsModal}) => {

    function openModal(){
        setIsModal(true)
    }

  return (
    <div className='p-10 z-10'>
        <button className='text-white/50 flex flex-col font-oswald px-2 py-1 transition-all text-3xl hover:text-white' onClick={openModal}>
            Create group
        </button>
    </div>
  )
}

export default AddTopBar