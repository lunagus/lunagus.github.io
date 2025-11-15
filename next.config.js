/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  // No basePath, no assetPrefix for root GitHub Pages sites
  // No trailingSlash needed
};

module.exports = nextConfig;
