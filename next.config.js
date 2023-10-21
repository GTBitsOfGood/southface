const withImages = require("next-images");

module.exports = withImages({
  staticPageGenerationTimeout: 1000,
  images: {
    domains: [
      "southfaceblob.blob.core.windows.net",
      "southface.blob.core.windows.net",
      "picsum.photos",
      "user-images.githubusercontent.com",
      "cdn.pixabay.com",
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
