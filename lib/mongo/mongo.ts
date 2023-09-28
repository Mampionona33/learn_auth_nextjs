import { Collection, Filter, Document } from "mongodb";
import clientPromise from ".";

class Mongo {
  private collection: Collection<Document> | null = null;

  constructor(private collectionName: string) {}

  private async init() {
    if (!this.collection) {
      const client = await clientPromise;
      const db = client.db();
      this.collection = db.collection(this.collectionName);
    }
  }

  public async get(query?: Filter<Document>) {
    try {
      await this.init();
      const result = query
        ? await this.collection!.find(query)
        : await this.collection!.find({});
      return await result.toArray();
    } catch (error) {
      return { error: `Failed to fetch ${this.collectionName}` };
    }
  }
}

export default Mongo;
