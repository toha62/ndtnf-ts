import { Schema, model, Types } from 'mongoose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      _id: Types.ObjectId;
      username: string;
      password: string;
      displayName: string;
      email: string;
    }
  }
}

export default interface User {
  _id: Types.ObjectId;
  username: string;
  password: string;
  displayName: string;
  email: string;
}

const userSchema = new Schema<User>({
  username: String,
  password: String,
  displayName: String,
  email: String,
});

export const UserModelDB = model<Express.User>('users', userSchema);
