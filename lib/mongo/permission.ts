import { Collection, Db, Filter, MongoClient, ObjectId } from "mongodb";
import Mongo from "./mongo";

class Permission {
  private collection: Collection | null = null;
  private collectionName: string = "permission";
  private mongo : Mongo;

  constructor() {
    this.mongo = new Mongo(this.collectionName)
  }

  public async fetch(query?:Filter<Document>){
    try {
      // const result = await this.mongo.get(query);
     
    } catch (error) {
      return {error:error}
    }
  }
}

export default Permission