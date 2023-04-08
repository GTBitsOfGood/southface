const withImages = require("next-images");

module.exports = withImages({
  images: {
    domains: [
      "southfaceblob.blob.core.windows.net",
      "southface.blob.core.windows.net",
      "picsum.photos",
      "user-images.githubusercontent.com",
      "southfaceblob.blob.core.windows.net",
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
