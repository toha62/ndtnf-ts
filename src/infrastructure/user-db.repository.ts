import { injectable } from 'inversify';
import { Schema, Types, model } from 'mongoose';
import UserRepository from '../abstractClasses/UserRepository';
// import CallbackUser from '../types';

@injectable()
export default class UserMongoRepository implements UserRepository {
  private UserModelDb;

  constructor() {
    const userSchema = new Schema<Express.User>({
      username: String,
      password: String,
      displayName: String,
      email: String,
    });

    this.UserModelDb = model<Express.User>('Users', userSchema);
  }

  async createUser(userData: Express.User): Promise<Express.User | null> {
    try {
      const newUser = new this.UserModelDb(userData);

      const user = await newUser.save();

      return user;
    } catch (err) {
      return null;
    }
  }

  async getUserById(id: Types.ObjectId): Promise<Express.User | null> {
    try {
      const user = await this.UserModelDb.findById(id).select('-__v');

      return user;
    } catch (err) {
      return null;
    }
  }

  async getUserByName(username: string): Promise<Express.User | null> {
    try {
      const user: Express.User[] = await this.UserModelDb.find({ username }).select('-__v');

      return user[0];
    } catch (err) {
      console.error('Error DB while trying to find user by name');
      return null;
    }
  }

  // async findById(id: Types.ObjectId, cb: CallbackUser) {
  //   const user = await this.getUserById(id);

  //   if (user) {
  //     cb(null, user);
  //   } else {
  //     cb('Error DB while trying to find user by id');
  //   }
  // }

  // async findByUsername(username: string, cb: CallbackUser) {
  //   console.log('Findining user by username: ', username);

  //   const user = await this.getUserByName(username);

  //   if (user) {
  //     cb(null, user);
  //   } else {
  //     cb(null, null);
  //   }
  // }

  // static verifyPassword(user: Express.User, password: string) {
  //   return user.password === password;
  // }

  // начальное заполнение БД для тестирования
  async fillDb() {
    await this.UserModelDb.deleteMany({});

    try {
      await this.UserModelDb.insertMany([
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
  }
}
