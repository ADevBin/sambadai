import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
  "salad-gem-duke.ngrok-free.dev",
  "192.168.1.75",
  ],

  serverExternalPackages: [
    "@dicebear/core",
    "@dicebear/collection",
    "@mediapipe/tasks-vision",
    "@stream-io/video-react-sdk",
  ],

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