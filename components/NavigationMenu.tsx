"use client";

import React, { useEffect, useRef, useState } from "react";

import { ChevronDown, Bell, Search } from "lucide-react";
import Image from "next/image";
import { MENU_ACTIONS } from "@/lib/contants";
import { useRouter } from "next/navigation";

const NavigationMenu = () => {
  const [profileIsOpen, setProfileIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setProfileIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside as EventListener);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
    };
  });

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
      });

      console.log(res);

      if (res.ok) {
        router.push("/");
      } else {
        const errorData = await res.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex items-center justify-between h-16 px-8 bg-black sticky top-0 z-50">
      <div className="flex items-center">
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

        <div className="relative z-50">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            ref={buttonRef}
            onClick={() => setProfileIsOpen(!profileIsOpen)}
            aria-expanded={profileIsOpen ? "true" : "false"}
            aria-haspopup="menu"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
              width={36}
              height={36}
              className="rounded"
            />
            <ChevronDown />
          </div>
          {profileIsOpen && (
            <div
              ref={menuRef}
              role="menu"
              aria-orientation="vertical"
              className="absolute right-0 mt-2 w-72 bg-black border border-gray-700 shadow-lg transform origin-top-right transition-all duration-200 ease-out animate-fade-in-up"
            >
              {MENU_ACTIONS.map((action, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex items-center px-4 py-2 text-white hover:bg-gray-800 text-sm"
                >
                  {action.name}
                </a>
              ))}
              <form action={handleSignOut}>
                <button
                  className="w-full text-center px-4 py-2 text-white hover:bg-gray-800 text-sm cursor-pointer border-t-2"
                  role="menuitem"
                >
                  Sing out
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
