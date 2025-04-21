import { ArrowRight } from "lucide-react";
import React from "react";
import { Banner1img } from "../assets";

function Banner1() {
  return (
    <div className="h-full w-full bg-[#1f1f1f] flex flex-col md:flex-row items-center px-6 pt-16 relative overflow-hidden shadow-2xl">

      {/* BACKGROUND BARS */}
      <div className="absolute h-full w-full top-0 left-0">
        <div className="absolute h-55 w-25 rounded-b-full bg-[#050505b7] -top-5 -left-5 z-0 opacity-55"></div>
        <div className="absolute h-45 w-25 rounded-b-full bg-[#050505b7] -top-5 left-[80px] z-0 opacity-55"></div>
        <div className="absolute h-35 w-25 rounded-b-full bg-[#050505b7] -top-5 left-[180px] z-0 opacity-55"></div>
        <div className="absolute h-25 w-25 rounded-b-full bg-[#050505b7] -top-5 left-[280px] z-0 opacity-55"></div>
        <div className="absolute h-15 w-25 rounded-b-full bg-[#050505b7] -top-5 left-[380px] z-0 opacity-55"></div>

        <div className="absolute h-55 w-25 rounded-t-full bg-[#050505b7] -bottom-5 right-0.5 z-0 opacity-55"></div>
        <div className="absolute h-45 w-25 rounded-t-full bg-[#050505b7] -bottom-5 right-[101px] z-0 opacity-55"></div>
        <div className="absolute h-35 w-25 rounded-t-full bg-[#050505b7] -bottom-5 right-[201px] z-0 opacity-55"></div>
        <div className="absolute h-25 w-25 rounded-t-full bg-[#050505b7] -bottom-5 right-[301px] z-0 opacity-55"></div>
        <div className="absolute h-15 w-25 rounded-t-full bg-[#050505b7] -bottom-5 right-[399px] z-0 opacity-55"></div>
      </div>

      <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center md:justify-start z-5 mb-8">

      {/* TEXT DIV */}
        <div className="flex flex-col items-center md:items-start gap-3 w-full max-w-md md:ml-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white/80 font-['Montserrat'] text-center md:text-left">
            Your Smarter <br />
            Way to <span className="text-gray-500">"Ride"</span>
          </h1>

          <p className="text-gray-400/80 text-center md:text-left text-sm italic">
            Get best deals on your next ride!
            <br />
            Grab the deal and get up to 25% OFF on your first ride.
          </p>

          <div className="w-[70%] md:w-full flex gap-3">
            <button className="w-1/2 border rounded-2xl py-2 border-white font-medium text-white cursor-pointer mt-6 flex items-center justify-center gap-3 hover:bg-white/70 hover:text-black transition-all">
              Book a Ride <ArrowRight size={20}/>
            </button>

            <button className="w-1/2 border rounded-2xl py-2 border-white bg-white/70 text-black hover:text-white hover:bg-transparent cursor-pointer mt-6 flex items-center justify-center gap-3 transition-all font-medium">
              Offer Ride 
            </button>
          </div>

          <div className="w-[70%] md:w-full ">
            <p className="text-white/40 text-sm w-full text-center italic">Are you a Tourist?</p>
            <button className="w-full bg-white/80 rounded-3xl py-2 font-medium  cursor-pointer mt-3">Explore the city with local People</button>
          </div>
        </div>
      </div>

      {/* IMAGE DIV */}

      <div className="w-full md:w-1/2 order-1 md:order-2 z-5">
        <img
          src={Banner1img}
          className="w-full max-w-[800px] mx-auto md:px-3"
          alt="banner"
        />
      </div>
    </div>
  );
}

export default Banner1;
