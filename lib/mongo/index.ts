import { MongoClient } from "mongodb";

const mongodbPassword = process.env.MONGO_PASSWORD || "Arc35b6FHQEIWOqb";
const dbName = process.env.MONGODB_DB_NAME;

const URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://ramamps33:${mongodbPassword}@cluster0.vkfhid4.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const options = {};

if (!URI) throw new Error("Please add your Mongo URI to .env local");

let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoclientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
