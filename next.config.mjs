
/** @type {import('next').NextConfig} */
const backendUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api'
);

const localUploadPattern = {
  protocol: 'http',
  hostname: 'localhost',
  port: '5050',
  pathname: '/uploads/**',
};

const configuredUploadPattern = {
  protocol: backendUrl.protocol.replace(':', ''),
  hostname: backendUrl.hostname,
  port: backendUrl.port,
  pathname: '/uploads/**',
};

const sameAsLocal = Object.entries(localUploadPattern).every(
  ([key, value]) => configuredUploadPattern[key] === value
);

const nextConfig = {
  images: {
    remotePatterns: [
      localUploadPattern,
      ...(sameAsLocal ? [] : [configuredUploadPattern]),
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;