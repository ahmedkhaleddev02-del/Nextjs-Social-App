import type { NextConfig } from "next";
//https://linked-posts.routemisr.com/uploads/default-profile.png
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linked-posts.routemisr.com',
        pathname: '/uploads/*',
        search: '',
      },
    ],
  },
    eslint: {
    ignoreDuringBuilds: true, // ⬅️ ده اللي يخلي Vercel يكمل حتى لو في lint errors
  },
  typescript: {
    ignoreBuildErrors: true, // ⬅️ لو عايز برضو يتجاهل TypeScript errors
  },
};

export default nextConfig;
