/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any hostname
      },
    ],
    domains: [
      "assets.aceternity.com",
      "www.svgrepo.com",
      "80fb35fb2bb8119483bb77e1f9b0ea7c.r2.cloudflarestorage.com",
      "pub-ff08bd4303464081b6823fbbecdd329c.r2.dev",
    ],
  },
};

export default nextConfig;
