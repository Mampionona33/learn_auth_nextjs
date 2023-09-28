import { Collection} from "mongodb";
import init from "./init";
import get from "./get";

class User {
  private collectionName : string = "users";
  private users: Collection ={} as Collection;
  private init = async ()=>  {await  init(this.collectionName)};
  

  public async getAll() {
    try {
      if (!this.users) await this.init;
      const users = await this.users!.find({}).toArray();
      return { users: users };
    } catch (error) {
      return { error: "Failed to fetch users" };
    }
  }

 public async getByEmail(userEmail: string | undefined | null) {
    const query = { email: userEmail };
    return await get(query, this.users);
  }

  // public async getByEmail(userEmail: string | undefined | null) {
  //   try {
  //     if (!this.users) await this.init;
  //     const query = { email: userEmail };
  //     const searchUser = await this.users!.findOne(query);
  //     return searchUser;
  //   } catch (error) {
  //     return { error: "Failed to fetch user by email" };
  //   }
  // }

  constructor() {
    (async () => {
      await this.init;
    })();
  }
}

export default User;
