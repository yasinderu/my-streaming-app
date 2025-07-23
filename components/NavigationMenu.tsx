import React from "react";

import { ChevronDown, Bell, Search } from "lucide-react";

const NavigationMenu = () => {
  return (
    <nav className="flex items-center justify-between h-16 px-8 bg-black sticky top-0 z-50">
      <div className="flex items-center">
        {/* <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
            className="h-6 mr-8"
          /> */}

        <ul className="flex space-x-7 text-white text-sm font-normal">
          <li>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              TV Shows
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Movies
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              New & Popular
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              My List
            </a>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-6 text-white text-sm">
        <div className="flex items-center border border-gray-400 focus-within:border-white p-1 transition-colors duration-200">
          <Search />
          <input
            type="text"
            placeholder="Titles, people, genres"
            className="bg-transparent focus:outline-none text-white placeholder-gray-400 w-48 text-sm"
          />
        </div>

        <div className="relative cursor-pointer">
          <Bell />
          {/* <span className="absolute -top-1 -right-1 bg-red-600 rounded-full h-3 w-3"></span> */}
        </div>

        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile"
            className="w-8 h-8 rounded"
          />
          <ChevronDown />
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
