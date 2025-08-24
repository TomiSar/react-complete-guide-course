import mongoose from 'mongoose';
import 'colors';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected to cluster: ${conn.connection.host}`.rainbow
    );
  } catch (error) {
    if (error instanceof mongoose.Error) {
      console.error(`MongoDB connection error: ${error.message}`.red);
    } else {
      console.error(`Unexpected error: ${error}`.red);
    }
  }
}
