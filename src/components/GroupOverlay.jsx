import React from 'react'

const GroupOverlay = ({ children }) => {
  return (
    <div className='grid grid-cols-3 grid-rows-3 gap-10 p-10'>
        {children}
    </div>
  )
}

export default GroupOverlay