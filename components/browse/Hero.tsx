"use client";

import { Play, Info } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-start pl-12 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/0 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/0 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-xl">
        <div className="mb-5">
          <p className="text-lg text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex space-x-4 mb-8">
          <button className="flex items-center px-6 py-3 bg-white text-black font-bold rounded-md text-lg hover:bg-gray-200 transition-colors gap-2 cursor-pointer">
            <Play /> Play
          </button>
          <button className="flex items-center px-6 py-3 bg-gray-600 bg-opacity-70 text-white font-bold rounded-md text-lg hover:bg-gray-700 hover:bg-opacity-70 transition-colors gap-2 cursor-pointer">
            <Info /> More Info
          </button>
        </div>
      </div>

      <div className="absolute bottom-20 right-12 bg-black bg-opacity-70 pl-4 pr-6 py-2 border-l-4 border-red-600 font-bold text-lg">
        <span>13+</span>
      </div>
    </section>
  );
}
