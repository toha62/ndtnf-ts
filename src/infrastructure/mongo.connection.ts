import { injectable } from 'inversify';
import mongoose from 'mongoose';

@injectable()
export default class DbConnection {
  private dbName: string;

  private dbURL: string;

  setParams(dbName: string, dbURL: string) {
    this.dbName = dbName;
    this.dbURL = dbURL;
  }

  async connect() {
    try {
      await mongoose.connect(this.dbURL, {
        dbName: this.dbName,
      });
      console.log('Mongoose connected');
    } catch (err) {
      console.error(err);
    }
  }
}
