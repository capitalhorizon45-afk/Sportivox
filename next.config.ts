import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "www.thesportsdb.com" },
      { protocol: "https", hostname: "crests.football-data.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "media.gettyimages.com" },
    ],
  },
};

export default nextConfig;
