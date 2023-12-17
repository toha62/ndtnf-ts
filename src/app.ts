import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose, { Types } from 'mongoose';
import { findByUsername, findById, verifyPassword } from './db/users';
import CallbackUser from './types';
// import User from './models/usersSchema';

import pagesRouter from './routes/pages';
import userRouter from './routes/user';
import booksRouter from './routes/books';

const verify = (username: string, password: string, done: CallbackUser) => {
  console.log('verify user: ', username, 'password: ', password);
  findByUsername(username, (err, user) => {
    if (err) {
      console.log('error: ', err);
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!verifyPassword(user, password)) {
      return done(null, false);
    }
    return done(null, user);
  });
};

const options = {
  usernameField: 'username',
  passwordField: 'userpassword',
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser<Types.ObjectId>((user, done) => {
  // eslint-disable-next-line no-underscore-dangle
  done(null, user._id);
});

passport.deserializeUser((id: Types.ObjectId, done) => {
  findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
});

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pagesRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

async function start(PORT: string | 3000, DB_URL: string) {
  try {
    await mongoose.connect(DB_URL, {
      dbName: 'library',
    });
    console.log('Mongoose connected');

    app.listen(PORT, () => {
      console.log(`Server listening port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line prefer-destructuring
const DB_URL = process.env.DB_URL;

start(PORT, DB_URL);
