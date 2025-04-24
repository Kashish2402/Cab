import React from "react";
import { AdvanceRide, Carpool, localBuddy, Rentals, RideImage } from "../assets";

function Services() {
  return (
    <div className="w-full flex items-center flex-col justify-center my-20">
      <div className="services mx-auto font-bold text-white/80 font-['Montserrat'] text-4xl relative z-1 mb-10 text-center">
        Our Services
      </div>
      {/* CarPooling Div */}
      <div className="w-[80%] lg:w-[60%] mx-auto flex items-center justify-between flex-col md:flex-row border border-gray-600/20 rounded-2xl p-[10px] md:border-transparent mb-10 md:shadow-2xl md:px-10 md:py-5 gap-5 md:gap-0">
        <div className="h-42 w-42 relative flex  items-center justify-center ">
          <img
            src={Carpool}
            alt=""
            width="90%"
            className="relative z-2 mb-10 scale-115 mr-10"
          />
          <div className="bg-black h-full w-full absolute top-0 left-0 -z-0 rounded-full shadow-xl"></div>
        </div>

        <div className="items-center md:items-start md:w-1/2 flex flex-col gap-3">
          <h1 className="text-3xl text-white/80 font-medium">Car Pooling</h1>
          <p className="text-white/40 text-center md:text-left">
            Affordable Sharing environment-friendly rides
          </p>

          <button className="bg-white w-fit px-4 py-2 rounded-3xl cursor-pointer text-sm font-semibold border-2 hover:bg-transparent hover:text-white hover:border-white transition-all ease-out duration-200">
            See More &gt;&gt;
          </button>
        </div>
      </div>

      {/* Ride Div */}
      <div className="w-[80%] lg:w-[60%] mx-auto flex items-center justify-between flex-col md:flex-row border border-gray-600/20 rounded-2xl p-[10px] md:border-transparent mb-10 md:shadow-2xl md:px-10 md:py-5">
        <div className="h-42 w-42 relative flex  items-center justify-center md:order-2">
          <img
            src={RideImage}
            alt=""
            width="90%"
            className="relative z-2 scale-125 mr-10"
          />
          <div className="bg-black h-full w-full absolute top-0 left-0 -z-0 rounded-full shadow-xl"></div>
        </div>

        <div className="max-auto md:w-1/2 flex flex-col gap-3 items-center md:items-start">
          <h1 className="text-3xl text-white/80 font-medium">Ride</h1>
          <p className="text-white/40 text-center">Go anytime, anywhere...</p>
          <button className="bg-white w-fit px-4 py-2 rounded-3xl cursor-pointer text-sm font-semibold border-2 hover:bg-transparent hover:text-white hover:border-white transition-all ease-out duration-200">
            See More &gt;&gt;
          </button>
        </div>
      </div>

      {/* Tourist Guide Service Div */}
      <div className="w-[80%] lg:w-[60%] mx-auto flex items-center justify-between flex-col md:flex-row border border-gray-600/20 rounded-2xl p-[10px] md:border-transparent md:shadow-2xl mb-10 md:px-10 md:py-5">
        <div className="h-42 w-42 relative flex  items-center justify-center ">
          <img
            src={localBuddy}
            alt=""
            width="90%"
            className="relative z-2 scale-125 mr-8 mb-10"
          />
          <div className="bg-black h-full w-full absolute top-0 left-0 -z-0 rounded-full shadow-xl"></div>
        </div>

        <div className="max-auto md:w-1/2 flex flex-col gap-3 items-center md:items-start">
          <h1 className="text-3xl text-white/80 font-medium">Local Buddy</h1>
          <p className="text-white/40 text-center md:text-left">
            For Tourists – Discover the City with Ease
          </p>

          <button className="bg-white w-fit px-4 py-2 rounded-3xl cursor-pointer text-sm font-semibold border-2 hover:bg-transparent hover:text-white hover:border-white transition-all ease-out duration-200">
            See More &gt;&gt;
          </button>
        </div>
      </div>

      {/* Rentals */}
      <div className="w-[80%] lg:w-[60%] mx-auto flex items-center justify-between flex-col md:flex-row border border-gray-600/20 rounded-2xl p-[10px] md:border-transparent mb-10 md:shadow-2xl md:px-10 md:py-5">
        <div className="h-42 w-42 relative flex  items-center justify-center md:order-2">
          <img
            src={Rentals}
            alt=""
            width="90%"
            className="relative z-2 scale-145 mr-10"
          />
          <div className="bg-black h-full w-full absolute top-0 left-0 -z-0 rounded-full shadow-xl"></div>
        </div>

        <div className="max-auto md:w-1/2 flex flex-col gap-3 items-center md:items-start">
          <h1 className="text-3xl text-white/80 font-medium">Rentals</h1>
          <p className="text-white/40 text-center md:text-left">
            Request a ride for multiple stops and enjoy flexible travel options.
          </p>
          <button className="bg-white w-fit px-4 py-2 rounded-3xl cursor-pointer text-sm font-semibold border-2 hover:bg-transparent hover:text-white hover:border-white transition-all ease-out duration-200">
            See More &gt;&gt;
          </button>
        </div>
      </div>

 {/* Reserve Div */}
 <div className="w-[80%] lg:w-[60%] mx-auto flex items-center justify-between flex-col md:flex-row border border-gray-600/20 rounded-2xl p-[10px] md:border-transparent md:shadow-2xl mb-10 md:px-10 md:py-5">
        <div className="h-42 w-42 relative flex  items-center justify-center ">
          <img
            src={AdvanceRide}
            alt=""
            width="90%"
            className="relative z-2 scale-125 ml-10"
          />
          <div className="bg-black h-full w-full absolute top-0 left-0 -z-0 rounded-full shadow-xl"></div>
        </div>

        <div className="max-auto md:w-1/2 flex flex-col gap-3 items-center md:items-start">
          <h1 className="text-3xl text-white/80 font-medium">Advance ride booking</h1>
          <p className="text-white/40 text-center md:text-left">
            Book your ride in advance to avoid last minute delays.
          </p>

          <button className="bg-white w-fit px-4 py-2 rounded-3xl cursor-pointer text-sm font-semibold border-2 hover:bg-transparent hover:text-white hover:border-white transition-all ease-out duration-200">
            See More &gt;&gt;
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Services;
