// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   serverExternalPackages: ["@dicebear/core", "@dicebear/collection"],
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@dicebear/core", "@dicebear/collection"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/trpc/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
