import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from ".";

class Groupe_permission {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private groupe_permission: Collection | null = null;

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

  public async get(groupeId: string | undefined | null) {
    try {
      if (!this.groupe_permission) await this.init();
      const query = { groupe: new ObjectId(groupeId!) };
      //   console.log("query", query);

      const searchGroupePermission = await this.groupe_permission!.find(
        query
      ).toArray();
      //   console.log(searchGroupePermission);
      return searchGroupePermission;
    } catch (error) {
      return { error: "Failed to fetch groupe_permission by groupeId" };
    }
  }

  constructor() {
    (async () => {
      await this.init;
    })();
  }
}

export default Groupe_permission;
