"use client";

import { Profile } from "@/types/Profile";

interface ProfileProps {
  profile: Profile;
  handleSelectedProfile: (profile: Profile | null) => void;
}

export default function ProfileAvatar({
  profile,
  handleSelectedProfile,
}: ProfileProps) {
  return (
    <div
      key={profile.name}
      className="group flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => handleSelectedProfile(profile)}
    >
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-md overflow-hidden ring-4 ring-transparent group-hover:ring-white transition-all duration-300 ease-in-out">
        <img
          src={profile.avatar}
          alt={`${profile.name}'s avatar`}
          className="w-full h-full object-cover rounded-md"
        />
        {!!profile.pin && (
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <span className="mt-4 text-neutral-400 group-hover:text-white transition-colors duration-300">
        {profile.name}
      </span>
    </div>
  );
}
