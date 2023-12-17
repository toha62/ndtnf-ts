import { BookModelDB } from '../models/booksSchema';
import { UserModelDB } from '../models/usersSchema';

// начальное заполнение БД для тестирования
export default async function fillDB() {
  await UserModelDB.deleteMany({});
  await BookModelDB.deleteMany({});

  try {
    await UserModelDB.insertMany([
      {
        username: 'Ivan',
        password: '123',
        displayName: 'Иван Петров',
        email: 'ivan@mail.com',
      },
      {
        username: 'John',
        password: '111',
        displayName: 'Джон Уик',
        email: 'john@mail.com',
      },
    ]);
  } catch (err) {
    console.log('Error database initial insertion Users', err);
  }
  try {
    await BookModelDB.insertMany([
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

  const test = await UserModelDB.find();
  console.log(test);
}