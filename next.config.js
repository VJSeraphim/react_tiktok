/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['yt3.ggpht.com', 'upload3.inven.co.kr', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
