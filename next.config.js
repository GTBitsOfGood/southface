const withImages = require("next-images");

module.exports = withImages({
  images: {
    domains: [
      "southface.blob.core.windows.net",
      "picsum.photos",
      "user-images.githubusercontent.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/library",
        permanent: true,
      },
    ];
  },
});
