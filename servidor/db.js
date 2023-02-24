import mongoose from "mongoose";
import { mongodb_uri } from "./config.js";
// connect to the database

export const conectdb = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(mongodb_uri);
        console.log("🛰️  Mongo DB Connected "+conn.connection.name);
    } catch (error) {
        console.log("error conection mongo db"+error.message);
        process.exit(1);
    }
}