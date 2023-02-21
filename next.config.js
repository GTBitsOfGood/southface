const withImages = require("next-images");

module.exports = withImages({
  images: {
    domains: ["southface.blob.core.windows.net", "picsum.photos"],
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
  images: {
    domains: ["localhost", "picsum.photos"], // <== Domain name
  },
});
