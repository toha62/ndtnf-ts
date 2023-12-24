import { Types } from 'mongoose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      _id?: Types.ObjectId;
      username: string;
      password: string;
      displayName: string;
      email: string;
    }
  }
}

export default interface IBook {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  fileBook?: string;
}

// export interface IUser {
//   username: string;
//   password: string;
//   displayName: string;
//   email: string;
// }
