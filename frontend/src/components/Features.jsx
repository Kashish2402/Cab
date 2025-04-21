import React from "react";
import { AffordablePrice, ecofriendly, routesImg, safe } from "../assets";

function Features() {
  return (
    <div className="mb-10">
      <div>
        <div className="choose font-bold text-white/80 font-['Montserrat'] text-4xl relative z-1 mb-10 mx-auto text-center w-fit ">
          Why Choose Us ?
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-16">
        <div className=" w-[200px] lg:w-[300px] flex flex-col gap-3 items-center justify-center">
          <div className="mb-4 h-[120px] flex items-center justify-center">
            <img src={AffordablePrice} width="110px" alt="" />
          </div>
          <div className="">
            <h2 className="font-['Montserrat'] text-xl font-bold text-white/70 text-center">
              Affordable Travel
            </h2>
            <p className="text-center text-white/40 text-xs tracking-tight mt-2">
              Split the ride, not your budget. Share fuel costs with fellow
              riders and enjoy a smarter, more economical way to travel.
            </p>
          </div>
        </div>

        <div className=" w-[200px] lg:w-[300px] flex flex-col gap-3 items-center justify-center">
          <div className="mb-4 h-[120px] flex items-center justify-center">
            <img src={ecofriendly} width="130px" alt="" />
          </div>
          <div className="">
            <h2 className="font-['Montserrat'] text-xl font-bold text-white/70 text-center">
              Eco-Friendly Rides
            </h2>
            <p className="text-center text-white/40 text-xs tracking-tight mt-2">
              Every shared ride means one less car on the road — helping reduce
              traffic, pollution, and your carbon footprint.
            </p>
          </div>
        </div>

        <div className=" w-[200px] lg:w-[300px] flex flex-col gap-3 items-center justify-center">
          <div className="mb-4 h-[120px] flex items-center justify-center">
            <img src={safe} width="110px" alt="" />
          </div>
          <div className="">
            <h2 className="font-['Montserrat'] text-[20px] font-bold text-white/70 text-center">
              Verified Community
            </h2>
            <p className="text-center text-white/40 text-xs tracking-tight mt-2">
              Ride with confidence. All users have verified profiles, ratings,
              and real-time chat to ensure a safe and trusted experience.
            </p>
          </div>
        </div>

        <div className=" w-[200px] lg:w-[300px] flex flex-col gap-3 items-center justify-center">
          <div className="mb-4 h-[120px] flex items-center justify-center">
            <img src={routesImg} width="130px" alt="" className="invert scale-150 md:scale-200 rotate-x-50"/>
          </div>
          <div className="">
            <h2 className="font-['Montserrat'] text-xl font-bold text-white/70 text-center">
            Flexible & Convenient Routes
            </h2>
            <p className="text-center text-white/40 text-xs tracking-tight mt-2">
            Whether you're commuting to work or heading out for an adventure, find rides that match your schedule and preferred routes with ease.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Features;
