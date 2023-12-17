import { Schema, model, Types } from 'mongoose';

export default interface Book {
  _id: Types.ObjectId;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  fileBook: string;
}

const bookSchema = new Schema<Book>({
  _id: Types.ObjectId,
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  authors: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  fileCover: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
  fileBook: {
    type: String,
    default: '',
  },
});

export const BookModelDB = model<Book>('books', bookSchema);
