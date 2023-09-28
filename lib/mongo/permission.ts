import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from ".";

class Permission {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private permission: Collection | null = null;

  async init() {
    if (this.db) return;
    try {
      this.client = await clientPromise;
      this.db = await this.client.db();
      this.groupe_permission = await this.db.collection("groupe_permission");
    } catch (error) {
      throw error;
    }
  }
}
