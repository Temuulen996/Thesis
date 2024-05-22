/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: "http://localhost:3001",
    DB_URI: "mongodb+srv://Temuulen:Temuuka123@cluster0.ikgbq1w.mongodb.net/",
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "https://images.unsplash.com",
      "m.media-amazon.com",
      "play-lh.googleusercontent.com",
    ],
  },
};

export default nextConfig;
