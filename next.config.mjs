/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment this if you want to build local archive with site
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tontools.vishnevskiy.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
