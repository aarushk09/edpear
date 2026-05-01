import { fileURLToPath } from "node:url";

const monorepoRoot = fileURLToPath(new URL("..", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["edpear"],
  turbopack: {
    root: monorepoRoot,
  },
};

export default nextConfig;
