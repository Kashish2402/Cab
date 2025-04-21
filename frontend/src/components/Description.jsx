import React from 'react'
import { CarSearchIcon } from '../assets'

function Description() {
  return (
    <div className="w-full flex items-center flex-col justify-center my-20">
      <div className="work mx-auto font-bold text-white/80 font-['Montserrat'] text-4xl relative z-1 mb-10 text-center">How Carpooling works ?</div>

      <div className="grid grid-cols-1 md:grid-cols-3 w-[80%] mx-auto gap-4 mt-10">
        <div className='bg-[#2e2e2e9f] w-full rounded-2xl flex items-center flex-col lg:w-[80%] p-3'>
        <div className='w-50 '>
            <img src={CarSearchIcon} alt="" />
        </div>

        <div className='mx-5 mt-3'>
            <h1 className='text-3xl text-white/90'>Search a Ride</h1>
           
            <p className='text-sm text-white/30 tracking-tighter italic mt-2'>Enter your destination and find available rides nearby.</p>
        </div>
        </div>

        <div className='bg-[rgba(46,46,46,0.62)] w-full rounded-2xl flex items-center flex-col lg:w-[80%] p-3'>
        <div className='w-50'>
            <img src={CarSearchIcon} alt="" />
        </div>

        <div className='mx-5 mt-3'>
            <h1 className='text-3xl text-white/90'>Connect with Leaders</h1>
           
            <p className='text-sm text-white/30 tracking-tighter italic mt-2'>Chat securely and coordinate pickup and timing.</p>
        </div>
        </div>

        <div className='bg-[#2e2e2e9f] w-full rounded-2xl flex items-center flex-col lg:w-[80%] p-3'>
        <div className='w-50'>
            <img src={CarSearchIcon} alt="" />
        </div>

        <div className='mx-5 mt-3'>
            <h1 className='text-3xl text-white/90'>Ride & Save</h1>
           
            <p className='text-sm text-white/30 tracking-tighter italic mt-2'>Share the trip, split the cost, and enjoy the journey.</p>
        </div>
        </div>

       
      </div>
    </div>
  )
}

export default Description
