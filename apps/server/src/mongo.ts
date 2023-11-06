import mongoose from "mongoose";
import { config } from "./config";

console.log("config.MONGO_URI", config.MONGO_URI);

export const connectDatabase = (): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    mongoose.connection
      // Reject if an error ocurred when trying to connect to MongoDB
      .on("error", (error) => {
        console.log("ERROR: Connection to MongoDB failed");
        reject(error);
      })
      // Exit Process if there is no longer a Database Connection
      .on("close", () => {
        console.log("ERROR: Connection to MongoDB lost");
        process.exit(1);
      })
      // Connected to DB
      .once("open", () => {
        // Display connection information
        const infos = mongoose.connections;

        infos.map((info) => {
          console.log(`Connected to ${info.host}:${info.port}/${info.name}`);

          return info;
        });
        // Return sucessfull promisse
        resolve();
      });

    console.log("config.MONGO_URI", config.MONGO_URI);

    void mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      directConnection: true,
    });
  });
