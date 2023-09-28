import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from ".";
import init from "./init";

class Permission {
  private permission: Collection | null = null;
  private collectionName : string = "permission";
  private init =async () => await init(this.collectionName);

  constructor(){
    (async () => {
      await this.init;
    })();
  }
}
