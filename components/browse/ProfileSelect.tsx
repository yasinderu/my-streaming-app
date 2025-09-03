"use client";

import { useState } from "react";
import ProfileAvatar from "./profileSelect/profile";
import SelectedProfileModal from "./profileSelect/selectedProfileModal";
import { Profile } from "@/types/Profile";

interface ProfileSelectProps {
  profiles: Profile[];
}

export default function ProfileSelect({ profiles }: ProfileSelectProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const selectProfileHandler = async (profile: Profile | null) => {
    setSelectedProfile(profile);

    await fetch("/api/cookies", {
      method: "POST",
      body: JSON.stringify({
        cookiesName: "profileId",
        cookiesValue: profile?.id,
        actionType: "set",
      }),
    });
  };

  return (
    <div className="bg-neutral-900 text-white min-h-screen flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 sm:mb-16">
          Who&apos;s watching?
        </h1>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12">
          {profiles.map((profile, idx) => (
            <ProfileAvatar
              key={idx}
              profile={profile}
              handleSelectedProfile={selectProfileHandler}
            />
          ))}
        </div>

        <button className="px-6 py-2 border border-neutral-600 text-neutral-400 rounded-lg text-sm hover:border-white hover:text-white transition-colors">
          Manage Profiles
        </button>
      </div>

      {selectedProfile && (
        <SelectedProfileModal selectedProfile={selectedProfile} />
      )}
    </div>
  );
}
