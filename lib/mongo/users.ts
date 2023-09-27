import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "./index";

class User {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private users: Collection | null = null;

  async init() {
    if (this.db) return;
    try {
      this.client = await clientPromise;
      this.db = await this.client.db();
      this.users = await this.db.collection("users");
    } catch (error) {
      //   throw new Error( "Failed to stablish connection to database");
      throw error;
    }
  }

  public async getAll() {
    try {
      if (!this.users) await this.init();
      const users = await this.users!.find({}).toArray();
      // console.log(users);

      return { users: users };
    } catch (error) {
      return { error: "Failed to fetch users" };
    }
  }

  public async getByEmail(userEmail: string | undefined | null) {
    try {
      if (!this.users) await this.init();
      const query = { email: userEmail };
      const searchUser = await this.users!.findOne(query);
      return searchUser;
    } catch (error) {
      return { error: "Failed to fetch user by email" };
    }
  }

  constructor() {
    (async () => {
      await this.init();
    })();
  }
}

export default User;
