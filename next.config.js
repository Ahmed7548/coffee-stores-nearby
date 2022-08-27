/** @type {import('next').NextConfig} */
const nextConfig = {
	images: { domains: ["images.unsplash.com", "fastly.4sqi.net"] },
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = nextConfig;
