const blogCmsUrl = new URL(
  process.env.BLOG_CMS_URL || "https://countrycms.pfecglobal.com",
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/blogs/category/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
      {
        source: "/blogs/author/:slug",
        destination: "/author/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/blogs/:slug",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${blogCmsUrl.origin}`,
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: blogCmsUrl.protocol.replace(":", ""),
        hostname: blogCmsUrl.hostname,
        port: blogCmsUrl.port,
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
