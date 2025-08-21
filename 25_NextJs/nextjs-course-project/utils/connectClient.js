import { MongoClient } from 'mongodb';
import colors from 'colors';

let clientPromise;

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not set');
}

if (!global._mongoClientPromise) {
  const client = new MongoClient(process.env.MONGO_URI);
  global._mongoClientPromise = client.connect().then(() => {
    console.log(
      `MongoDB client connection established to ${process.env.MONGO_URI}`
        .rainbow
    );
    return client;
  });
} else {
  console.log('Using existing MongoDB client connection'.rainbow);
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
