import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://image.tmdb.org/t/p/**"),
      new URL("https://upload.wikimedia.org/wikipedia/**"),
    ],
  },
};

export default nextConfig;
