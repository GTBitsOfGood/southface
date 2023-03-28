import mongoose from "mongoose";

export default async () => {
  if (mongoose.connections[0].readyState) return;

  // if (!process.env.DB_URL || !process.env.DB_NAME) {
  //   throw new Error(
  //     "DB environmental variables are not set! Make sure to run yarn secrets"
  //   );
  // }

  /**
   * THIS SETS WHICH DATABASE YOU ARE USING!! Choose wisely
   * either choose processs.env.DB_URL_DEV (local) || process.env.DB_URL_PRODUCTION (atlas)
   *
   *  */
  const currentDatabase = process.env.DB_URL_DEV;

  await mongoose
    .connect(currentDatabase, {
      dbName: process.env.DB_NAME,
    })
    .catch((e) => {
      console.error("Error connecting to database.");
      throw e;
    });
};
