/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    // Add a rule for handling `.mp3` files
    config.module.rules.push({
      test: /\.mp3$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "static/sounds/",
            publicPath: "/_next/static/sounds/",
          },
        },
      ],
    });

    // Add a rule for handling `.mjs` files
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
  images: {
    domains: [
      "mintv2-web.myfilebase.com",
      "gateway.pinata.cloud",
      "ipfs.io",
      "dweb.link",
      "w3s.link",
    ],
  },
};

export default nextConfig;
