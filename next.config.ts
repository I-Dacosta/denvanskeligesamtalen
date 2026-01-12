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
  // Force clean build
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
};

export default withPayload(nextConfig);
