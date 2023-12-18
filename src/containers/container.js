import 'reflect-metadata';
import { Container } from 'inversify';
import BookRepository from '../book/BookRepository';

const container = new Container();

container.bind(BookRepository).toSelf();

export default container;
