import { connect } from "mongoose";
export default async function connecDB() {
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to the database");
  }
}
