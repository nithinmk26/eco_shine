import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubActions ? "/eco_shine" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;