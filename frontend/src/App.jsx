import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-full font-[Poppins] bg-[#121212]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Home />}></Route>
        <Route path="/signUp" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
