const nextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://khulaasaa-english.vercel.app"
      : undefined,
};

export default nextConfig;