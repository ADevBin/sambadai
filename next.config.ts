import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  experimental: {
    turbo: {
      resolveAlias: {
        "@mediapipe/tasks-vision": "@mediapipe/tasks-vision",
      },
    },
  },
};

export default nextConfig;