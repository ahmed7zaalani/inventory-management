/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**"
      }
    ]
  },
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true
  },
};

export default nextConfig;
