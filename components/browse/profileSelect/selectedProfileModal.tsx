"use client";

import { Profile } from "@/types/Profile";

interface SelectedProfileModalProps {
  selectedProfile: Profile;
}

export default function SelectedProfileModal({
  selectedProfile,
}: SelectedProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-neutral-800 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">
          {!!selectedProfile.pin
            ? "This profile is locked."
            : `Welcome, ${selectedProfile.name}!`}
        </h2>
        <p className="text-neutral-400 mb-6">
          {!!selectedProfile.pin
            ? "Please enter the PIN to continue."
            : "You have been logged in."}
        </p>
        <button
          onClick={() =>
            setTimeout(() => {
              window.location.reload();
            }, 1000)
          }
          className="bg-neutral-600 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
