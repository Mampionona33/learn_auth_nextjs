import { Collection, Filter } from "mongodb";
import Mongo from "./mongo";

class Groupe {
  private collectionName: string = "groupe";
  private mongo: Mongo;

  constructor() {
    this.mongo = new Mongo(this.collectionName);
  }

  public async fetch(query?: Filter<any>) {
    try {
      return await this.mongo.get(query);
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }
}
export default Groupe;
