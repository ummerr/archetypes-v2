import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/kwml/about", permanent: true },
      { source: "/boy-within-man", destination: "/kwml/boy-within-man", permanent: true },
      { source: "/archetype/:slug", destination: "/kwml/archetype/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
