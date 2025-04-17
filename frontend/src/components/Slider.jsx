import React from "react";
import Banner1 from "./Banner1";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Slider() {
  return (
    <div className="min-h-[70vh] md:h-[70vh] w-full relative">
      <button className="absolute top-[30%] z-100 hover:bg-black/20 h-50 flex items-center justify-center cursor-pointer text-gray-400/60">
        <ChevronLeft size={40} />
      </button>
      <Banner1 />

      <button className="absolute top-[30%] right-1 hover:bg-black/20 h-50 flex items-center justify-center cursor-pointer text-gray-400/60 z-100">
        <ChevronRight size={40} />
      </button>
    </div>
  );
}

export default Slider;
