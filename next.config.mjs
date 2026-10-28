/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  output: process.env.STATIC_EXPORT === '1' ? 'export' : undefined,
  images: process.env.STATIC_EXPORT === '1' ? { unoptimized: true } : undefined,
};

export default nextConfig;
