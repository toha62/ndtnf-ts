import { Types } from 'mongoose';
import User, { UserModelDB } from '../models/usersSchema';
import CallbackUser from '../types';

async function findById(id: Types.ObjectId, cb: CallbackUser) {
  try {
    const user = await UserModelDB.findById(id).select('-__v');

    cb(null, user);
  } catch (err) {
    cb(<string>err);
  }
}

async function findByUsername(username: string, cb: CallbackUser) {
  console.log('Findining user by username: ', username);
  try {
    const user: User[] = await UserModelDB.find({ username }).select('-__v');

    if (user) {
      cb(null, user[0]);
    } else {
      cb(null, null);
    }
  } catch (err) {
    cb(<string>err);
  }
}

const verifyPassword = (user: User, password: string) => user.password === password;

export { findById, findByUsername, verifyPassword };
