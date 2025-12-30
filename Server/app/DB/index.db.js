import mongoose from "mongoose";

export default async function connectDB () {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Database connection {file: index.db.js} error:", error);
        process.exit(1);
    }
} 