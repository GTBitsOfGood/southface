const withImages = require("next-images");

module.exports = withImages({
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
