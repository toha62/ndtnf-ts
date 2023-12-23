import 'reflect-metadata';
import { Container } from 'inversify';
import BookRepository from '../abstractClasses/BookRepository';
import UserRepository from '../abstractClasses/UserRepository';
import DbConnection from '../infrastructure/mongo.connection';
import BookMongoRepository from '../infrastructure/book-db.repository';
import UserMongoRepository from '../infrastructure/user-db.repository';

const container = new Container();

container.bind(BookRepository).to(BookMongoRepository).inSingletonScope();
container.bind(UserRepository).to(UserMongoRepository).inSingletonScope();
container.bind(DbConnection).toSelf().inSingletonScope();

export default container;
