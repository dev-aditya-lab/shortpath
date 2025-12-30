import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

let isConnected = false;

export async function connectDB() {
  if (isConnected && mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
