import clientPromise from "./index";

class User {
  private client;
  private db;
  private users;

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

  public async getUsers() {
    try {
      if (!this.users) await this.init();
      const users = await this.users.find({});
      console.log(users);
      
      return { users: users };
    } catch (error) {
      return { error: "Failed to fetch users" };
    }
  }

  constructor() {
    (async () => {
      await this.init();
    })();
  }
}

export default User;