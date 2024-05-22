/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  reactStrictMode: false,
  env: {
    API_URL: "http://localhost:3001",
    PRODUCTION_API_URL: "https://ethrift-server.onrender.com",
    DB_URI: "mongodb+srv://Temuulen:Temuuka123@cluster0.ikgbq1w.mongodb.net/",
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "m.media-amazon.com",
      "play-lh.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
