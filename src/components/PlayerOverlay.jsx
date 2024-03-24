import React from 'react'

const PlayerOverlay = ({children}) => {
  return (
    <form className='w-60 h-40 overflow-y-scroll'>
        {children}
    </form>
  )
}

export default PlayerOverlay