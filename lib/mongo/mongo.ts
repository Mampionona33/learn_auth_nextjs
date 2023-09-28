import { Collection, Db, Filter, MongoClient, ObjectId, Document } from "mongodb";
import clientPromise from ".";

class Mongo {
  private db: Db | null = null;
  private client: MongoClient | null = null;
  private collection: Collection | null = null;
  private collectionName: string = "";

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    (async () => {
      await this.init();
    })();
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

  public getCollection() {
    return this.collection;
  }

  public async get(query: Filter<Document> | undefined) {
    try {
      if (!this.collection) await this.init();
      const result = await (query
        ? this.collection!.find(query)
        : this.collection!.find());
      return result.toArray(); 
    } catch (error) {
      return { error: `Failed to fetch ${this.collectionName}` };
    }
  }
}

export default Mongo;
