import { useEffect, useState } from 'react'
import Modal from './Modal'

const GroupBox = ({ item }) => {
  const [name, setName] = useState("")
  const [isChangeName, setIsChangeName] = useState(false)

  function handleName() {
    setIsChangeName((prevState) => !prevState)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsChangeName(false)
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div className='min-w-max min-h-max bg-slate-500 p-4 text-black'>

      <div className='flex flex-row justify-between'>
      {
        <h1 onClick={handleName}>
          {name ? name : "Example Name"}
        </h1>
      }

      <h1>{item.length} players</h1>

      </div>

      {isChangeName ? <form className='flex flex-row' onSubmit={handleSubmit}>
        <input placeholder='Change NAME' onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
        : ""}

      {item?.map(({ value, label }, i) => (
        <div key={i}>
          <h1> id: {value}</h1>
          <h1> name: {label}</h1>
        </div>
      ))}
    </div>
  )
}

export default GroupBox
