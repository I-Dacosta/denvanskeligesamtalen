import path from "path";
import { fileURLToPath } from "url";

import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Packages that must run on the Node server, not be bundled
  serverExternalPackages: ['sharp', 'onnxruntime-node'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default withPayload(nextConfig);
