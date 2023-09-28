import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from ".";

async function init(collectionName: string) {
  let db:Db | null  = null
  let client : MongoClient | null = null;
  let result: Collection | null = null;
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    result = await db.collection(collectionName);
    return result
  } catch (error) {
    throw error;
  }
}

export default init;
