import { Types } from 'mongoose';
import CallbackUser from '../types';
import { userRepository } from '../routes/user';

async function findById(id: Types.ObjectId, cb: CallbackUser) {
  const user = await userRepository.getUserById(id);

  if (user) {
    cb(null, user);
  } else {
    cb('Error DB while trying to find user by id');
  }
}

async function findByUsername(username: string, cb: CallbackUser) {
  console.log('Findining user by username: ', username);

  const user = await userRepository.getUserByName(username);

  if (user) {
    cb(null, user);
  } else {
    cb(null, null);
  }
}

const verifyPassword = (user: Express.User, password: string) => user.password === password;

export { findById, findByUsername, verifyPassword };
