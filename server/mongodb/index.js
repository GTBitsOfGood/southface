import mongoose from "mongoose";

export default async () => {
  if (mongoose.connections[0].readyState) return;

  if (!process.env.DB_URL || !process.env.DB_NAME) {
    throw new Error("DB environmental variables are not set! Make sure to run yarn secrets")
  }

  await mongoose
    .connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    })
    .catch((e) => {
      console.error("Error connecting to database.");
      throw e;
    });
};
