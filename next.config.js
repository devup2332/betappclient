/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, ".env.local"),
});

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
