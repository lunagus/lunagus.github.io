/** @type {import('next').NextConfig} */
// If your GitHub repository is not named "portfolio", update the basePath below
// For example, if your repo is "my-portfolio", change '/portfolio' to '/my-portfolio'
const repoName = process.env.GITHUB_REPOSITORY_NAME || 'lunagus.github.io'
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}` : '',
}

module.exports = nextConfig

