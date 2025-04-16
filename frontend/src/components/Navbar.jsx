import React from "react";

function Navbar() {
  return (
    <div className="p-3 py-5  bg-gradient-to-br from-[black] to-gray-950 drop-shadow-lg border-b shadow-black">
      <div className="w-full flex items-center justify-between">
        <div className='relative font-["Great_Vibes"] text-3xl w-fit'>
          <h1 className="text-white/80 italic z-10">Ride</h1>

          <h1 className="absolute -right-13 -z-10 -bottom-3 text-white/40 italic">
            Mate
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-white/90 text-[15px] cursor-pointer border-none">
            LogIn
          </button>
          <button className="cursor-pointer bg-white/60 px-3 py-1 rounded-xl border-2 font-medium text-[15px] hover:text-white border-transparent hover:bg-transparent hover:border-white/50 transition-all ease-in duration-200">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
