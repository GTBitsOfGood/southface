import mongoose from "mongoose";

export default async () => {
  if (mongoose.connections[0].readyState) return;

  if (!process.env.DB_URL || !process.env.DB_NAME) {
    throw new Error(
      "DB environmental variables are not set! Make sure to run yarn secrets"
    );
  }

  /**
   * THIS SETS WHICH DATABASE YOU ARE USING!! Choose wisely
   * either choose processs.env.DB_URL_DEV (local) || process.env.DB_URL_PRODUCTION (atlas)
   *
   *  */

  /*await mongoose
    .connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    })
    .catch((e) => {
      console.error("Error connecting to database.");
      throw e;
    });*/
  await mongoose
    .connect(process.env.COSMOS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    })
    .catch((e) => {
      console.error("Error connecting to database.");
      throw e;
    });
};
