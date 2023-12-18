import Book from '../models/booksSchema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default abstract class BookRepository {
  protected BooksModelDB: unknown;

  constructor(BooksModelDB: unknown) {
    this.BooksModelDB = BooksModelDB;
  }

  abstract createBook(book: Book): Book;

  abstract getBook(id: string): Book;

  abstract getBooks(): Book[];

  abstract updateBook(id: string): Book;

  abstract deleteBook(id: string): void;
}
