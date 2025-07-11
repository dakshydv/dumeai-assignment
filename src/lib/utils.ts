import mongoose from "mongoose";

export async function DbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  name: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}


export type RecordStringAny = Record<string, unknown>;

export function createRecordStringAny(): RecordStringAny {
  return {};
}
