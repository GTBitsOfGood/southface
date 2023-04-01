export default async function handler(req, res) {
  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"

    const revalidationPaths = JSON.parse(req.query.pathToRevalidate);

    // eslint-disable-next-line no-undef
    Promise.all(
      revalidationPaths.map(async (path) => {
        await res.revalidate(path);
      })
    );

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err);
    return res.status(500).send("Error revalidating");
  }
}
