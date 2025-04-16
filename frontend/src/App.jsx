import React, { useState } from 'react'
import Navbar from './components/Navbar'
import "./App.css"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-full font-[Poppins] bg-[#121212]'>
      <Navbar />
    </div>
  )
}

export default App
