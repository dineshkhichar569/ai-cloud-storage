import { serverEnv } from "../env";
import mongoose from "mongoose";

declare global {
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export function getMongoose() {
  if (!global._mongooseConn) {
    mongoose.set("strictQuery", true);
    global._mongooseConn = mongoose
      .connect(serverEnv.MONGODB_URI)
      .then((conn) => {
        return conn;
      })
      .catch((err) => {
        console.error("MongoDB connection error: ", err);
        throw err;
      });
  }
  return global._mongooseConn;
}

export const mongoClientPromise = (async () => {
  const conn = await getMongoose();
  return conn.connection.getClient();
})();
