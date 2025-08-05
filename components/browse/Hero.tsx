"use client";

import { Play, Info } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Hero() {
  const [playing, setPlaying] = useState(true);
  const [heroScrolled, setHeroScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;

      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercentage >= 20 && !heroScrolled) {
        setHeroScrolled(true);
        setPlaying(false);
      } else if (scrollPercentage < 20 && heroScrolled) {
        setHeroScrolled(false);
        setPlaying(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [heroScrolled]);
  return (
    <section className="relative w-full h-screen flex items-center justify-start pl-12 overflow-hidden">
      <div className="absolute inset-0">
        <ReactPlayer
          src="https://www.youtube.com/watch?v=YoHD9XEInc0&t=3s"
          style={{ width: "100%", height: "100%" }}
          muted
          playing={playing}
        />
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
