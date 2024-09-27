/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'motorindia.in',
          port: '',
          pathname: '/**',
        },
      ],
    
  },

};

export default nextConfig;
