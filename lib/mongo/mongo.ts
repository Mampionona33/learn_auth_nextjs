import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from ".";

class Mongo {
  private db: Db | null = null;
  private client: MongoClient | null = null;
  private collection: Collection | null = null;
  private collectionName: string = "";

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    async () => {
      await this.init;
    };
  }

  public async init() {
    if (this.db) return;
    try {
      this.client = await clientPromise;
      this.db = await this.client.db();
      this.collection = await this.db.collection(this.collectionName);
      return this.collection;
    } catch (error) {
      throw error;
    }
  }
}

export default Mongo;
