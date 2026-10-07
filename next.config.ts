import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Let phones and other computers on the home or office network load the dev
     site by this machine's local address, not just localhost. */
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
};

export default nextConfig;
