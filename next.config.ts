import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Let phones and other computers on the home or office network load the dev
     site by this machine's local address, not just localhost. */
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  /* 92 is kept for the home page's hero photo, which is only 1080px wide and
     loses visibly at the default 75. */
  images: { qualities: [75, 92] },
  /* The studio is the home page now. */
  async redirects() {
    return [{ source: "/studio", destination: "/", permanent: false }];
  },
};

export default nextConfig;
