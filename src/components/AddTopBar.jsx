import React from 'react'

const AddTopBar = ({setIsModal}) => {

    function openModal(){
        setIsModal(true)
    }

  return (
    <div className='p-10'>
        <button className='bg-white rounded-2xl border-neutral-800 border max-w-max px-2 py-1 hover:bg-white/50 transition-all' onClick={openModal}>
            Create group
        </button>
    </div>
  )
}

export default AddTopBar