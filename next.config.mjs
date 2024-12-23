/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment this if you want to build local archive with site
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vik-777.github.io",
        port: "",
        pathname: "/tap-ui/**",
      },
    ],
  },
}

export default nextConfig
