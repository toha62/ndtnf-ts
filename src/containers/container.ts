import 'reflect-metadata';
import { Container } from 'inversify';
import BookRepository from '../book/BookRepository';
import DbConnection from '../infrastructure/mongo.connection';
import BookDbRepository from '../infrastructure/book-db.repository';

const container = new Container();

// container.bind(BookRepository).toSelf();
container.bind(BookRepository).to(BookDbRepository);
container.bind(DbConnection).toSelf();

export default container;
