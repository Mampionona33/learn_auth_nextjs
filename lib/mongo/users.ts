import { Collection } from "mongodb";
import Mongo from "./mongo";

class User {
  private collectionName: string = "users";
  private users: Collection | null = null;
  private mongo: Mongo;

  constructor() {
    this.mongo = new Mongo(this.collectionName);
  }

  public async fetch(query?: FilterQuery<any>) {
    try {
      return await this.mongo.get(query);
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }

  public async fetchAll() {
    return { users: await this.fetch() };
  }

  public getAll(): Collection | null {
    return this.users;
  }

  public async getByEmail(userEmail: string | undefined | null) {
    const query = { email: userEmail };
    const result = await this.mongo.get(query);
    console.log(result);
    return result;
  }
}

export default User;

// import { Collection } from "mongodb";
// import init from "./init";
// import get from "./get";
// import Mongo from "./mongo";

// class User {
//   private collectionName: string = "users";
//   private users: Collection = {} as Collection;
//   // private init = async ()=>  {await  init(this.collectionName)};
//   private mongo = new Mongo(this.collectionName);
//   private init = async () => await this.mongo.init();

//   public async getAll() {
//     try {
//       if (!this.users) await this.init;
//       const users = await this.users!.find({}).toArray();
//       return { users: users };
//     } catch (error) {
//       return { error: "Failed to fetch users" };
//     }
//   }

//   public async getByEmail(userEmail: string | undefined | null) {
//     const query = { email: userEmail };
//     return await get(query, this.users);
//   }

//   // public async getByEmail(userEmail: string | undefined | null) {
//   //   try {
//   //     if (!this.users) await this.init;
//   //     const query = { email: userEmail };
//   //     const searchUser = await this.users!.findOne(query);
//   //     return searchUser;
//   //   } catch (error) {
//   //     return { error: "Failed to fetch user by email" };
//   //   }
//   // }

//   constructor() {
//     // (async () => {
//     //   await this.init;
//     // })();
//   }
// }

// export default User;
// export default User;
