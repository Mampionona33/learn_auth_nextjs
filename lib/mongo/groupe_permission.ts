import { Collection, ObjectId } from "mongodb";
import init from "./init";
import Mongo from "./mongo";

class Groupe_permission {
  private groupe_permission: Collection | null = null;
  private collectionName: string = "groupe_permission";
  // private init = async () => await init(this.collectionName);

  private mongo: Mongo;

  public async get(groupeId: string | undefined | null) {
    try {
      const groupe_permission = await this.mongo.get({
        groupe: new ObjectId(groupeId!),
      });
      console.log(groupe_permission);
      return groupe_permission;
    } catch (error) {
      return { error: `Failed to fetch groupe_permission by${groupeId}` };
    }
    // try {
    //   if (!this.groupe_permission) await this.init();
    //   const query = { groupe: new ObjectId(groupeId!) };
    //   const searchGroupePermission = await this.groupe_permission!.find(
    //     query
    //   ).toArray();
    //   return searchGroupePermission;
    // } catch (error) {
    //   return { error: "Failed to fetch groupe_permission by groupeId" };
    // }
  }

  constructor() {
    this.mongo = new Mongo(this.collectionName);
    // (async () => {
    //   await this.init;
    // })();
  }
}

export default Groupe_permission;
