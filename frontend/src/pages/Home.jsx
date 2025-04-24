import React from "react";
import Slider from "../components/Slider";
import Description from "../components/Description";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Services from "../components/Services";

function Home() {
  return (
    <div>
      <Slider />
      <Services/>
      <Description />
      <Features/>
      <Footer/>
    </div>
  );
}

export default Home;
