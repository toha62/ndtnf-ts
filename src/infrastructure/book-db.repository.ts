import { injectable } from 'inversify';
import { Schema, model } from 'mongoose';
import BookRepository from '../book/BookRepository';
import IBook from '../interfaces/index';

@injectable()
export default class BookMongoRepository implements BookRepository {
  private BookModelDb;

  constructor() {
    const bookSchema = new Schema<IBook>({
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

    this.BookModelDb = model<IBook>('Books', bookSchema);
  }

  async createBook(bookData: IBook): Promise<IBook | null> {
    try {
      const newBook = new this.BookModelDb(bookData);

      const book = await newBook.save();

      return book;
    } catch (err) {
      return null;
    }
  }

  async getBook(id: string): Promise<IBook | null> {
    try {
      const book = await this.BookModelDb.findById(id).select('-__v');

      return book;
    } catch (err) {
      return null;
    }
  }

  async getBooks(): Promise<IBook[] | null> {
    try {
      const books = await this.BookModelDb.find().select('-__v');

      return books;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async updateBook(id: string, updatedData: IBook): Promise<IBook | null> {
    try {
      const book = await this.BookModelDb.findByIdAndUpdate(id, updatedData);

      return book;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async deleteBook(id: string): Promise<true | false> {
    try {
      await this.BookModelDb.findByIdAndDelete(id);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // начальное заполнение БД для тестирования
  async fillDb() {
    await this.BookModelDb.deleteMany({});

    try {
      await this.BookModelDb.insertMany([
        {
          title: 'Война и мир',
          authors: 'Л.Н.Толстой',
          description: 'Русская классика',
        },
        {
          title: 'Академия',
          authors: 'А.Азимов',
          description: 'Фантастика',
        },
      ]);
    } catch (err) {
      console.log('Error database initial insertion Books', err);
    }
  }
}
