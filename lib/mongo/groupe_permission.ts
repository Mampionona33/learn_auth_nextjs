import { Collection, ObjectId } from "mongodb";
import init from "./init";

class Groupe_permission {
  
  private groupe_permission: Collection | null = null;
  private collectionName : string = "groupe_permission";
  private init = async ()=>await init(this.collectionName);

  public async get(groupeId: string | undefined | null) {
    try {
      if (!this.groupe_permission) await this.init();
      const query = { groupe: new ObjectId(groupeId!) };
      const searchGroupePermission = await this.groupe_permission!.find(
        query
      ).toArray();
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
