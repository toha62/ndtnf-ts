import { injectable } from 'inversify';
import IBook from '../interfaces/index';

@injectable()
export default abstract class BookRepository {
  abstract createBook(bookData: IBook): Promise<IBook | null>;

  abstract getBook(id: string): Promise<IBook | null>;

  abstract getBooks(): Promise<IBook[] | null>;

  abstract updateBook(id: string, updatedData: IBook): Promise<IBook | null>;

  abstract deleteBook(id: string): Promise<true | false>;
}
