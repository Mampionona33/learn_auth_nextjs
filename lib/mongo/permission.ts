import { Collection, Filter, Document } from "mongodb";
import Mongo from "./mongo";

class Permission {
  private collection: Collection<Document> | null = null;
  private collectionName: string = "permissions"; // Nom de la collection corrigé
  private mongo: Mongo;

  constructor() {
    this.mongo = new Mongo(this.collectionName);
  }

  public async fetch(query?: Filter<Document>) {
    try {
      const permissions = await this.mongo.get(query ? query : {});
      return { permissions: permissions }; 
    } catch (error) {
      return { error: error };
    }
  }
}

export default Permission;
