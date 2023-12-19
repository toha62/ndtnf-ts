import { Types } from 'mongoose';

export default interface IBook {
  _id: Types.ObjectId;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  fileBook: string;
}
