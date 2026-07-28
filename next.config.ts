import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.TABTELL_GITHUB_PAGES === "1";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  ...(isGitHubPagesBuild
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
