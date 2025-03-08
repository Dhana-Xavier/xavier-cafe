import React from "react";
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('https://source.unsplash.com/1600x900/?coffee,cafe')] bg-cover bg-center text-white">
      <div className="bg-black bg-opacity-50 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Café Bliss ☕</h1>
        <p className="text-lg mb-6">Experience the finest coffee & delightful treats.</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-yellow-500 text-black px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-yellow-600"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
