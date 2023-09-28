import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from ".";

async function init(collectionName: string) {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    groupe_permission = await db.collection(collectionName);
  } catch (error) {
    throw error;
  }
}

export default init;
