"use server";

import Hero from "@/components/browse/Hero";
import MovieDetail from "@/components/browse/MovieDetail";
import MovieList from "@/components/browse/MovieList";
import ProfileSelect from "@/components/browse/ProfileSelect";
import Footer from "@/components/Footer";
import NavigationMenu from "@/components/NavigationMenu";
import { MOVIE_SECTION_TITLES } from "@/data";
import { cookies } from "next/headers";
import React from "react";
import { getProfiles } from "../actions/profile";
import { auth } from "@/auth";
import { Profile } from "@/types/Profile";

export default async function BrowseMoviePage() {
  const cookieStore = await cookies();
  const session = await auth();
  const userId = session?.user.id as string;

  const profiles = (await getProfiles(userId)) as Profile[];

  const profileId = cookieStore.get("profileId");
  return (
    <div>
      {!profileId?.value ? (
        <ProfileSelect profiles={profiles} />
      ) : (
        <>
          <NavigationMenu />
          <Hero />

          {MOVIE_SECTION_TITLES.map((sec, idx) => (
            <div className="overflow-x-clip" key={idx}>
              <MovieList
                sectionTitle={sec.displayText}
                queryTitle={sec.queryText}
              />
            </div>
          ))}

          <MovieDetail />
          <Footer />
        </>
      )}
    </div>
  );
}
