// import { injectable } from 'inversify';
// import { Schema, model, Types } from 'mongoose';
// import BookRepository from './BookRepository';
// import IBook from '../interfaces/index';

// @injectable()
// export default class BookService {
//   private BookModelDb;

//   constructor(private readonly repo: BookRepository) {
//     const bookSchema = new Schema<IBook>({
//       _id: Types.ObjectId,
//       title: {
//         type: String,
//       },
//       description: {
//         type: String,
//       },
//       authors: {
//         type: String,
//       },
//       favorite: {
//         type: Boolean,
//         default: false,
//       },
//       fileCover: {
//         type: String,
//         default: '',
//       },
//       fileName: {
//         type: String,
//         default: '',
//       },
//       fileBook: {
//         type: String,
//         default: '',
//       },
//     });

//     this.BookModelDb = model<IBook>('books', bookSchema);
//   }
// }
