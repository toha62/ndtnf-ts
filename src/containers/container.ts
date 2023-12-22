import 'reflect-metadata';
import { Container } from 'inversify';
import BookRepository from '../book/BookRepository';
import DbConnection from '../infrastructure/mongo.connection';
import BookMongoRepository from '../infrastructure/book-db.repository';

const container = new Container();

container.bind(BookRepository).to(BookMongoRepository);
container.bind(DbConnection).toSelf();

export default container;
