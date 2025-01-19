/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  experimental: {
    serverComponentsExternalPackages: ["pino", "pino-pretty"]
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://*.bullhornstaffing.com" // Specific to Bullhorn iframe
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://*.bullhornstaffing.com chrome-extension://knmcfehmcfafmgjikhdjhljebnkickgm;" // Allow Bullhorn and Chrome extension
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
