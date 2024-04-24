import React from 'react'

const GroupOverlay = ({ children }) => {
  return (
    <div className='grid grid-cols-1 grid-rows-3 gap-10 p-4 lg:grid-cols-3'>
        {children}
    </div>
  )
}

export default GroupOverlay