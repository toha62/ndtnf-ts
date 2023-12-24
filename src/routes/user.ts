import express from 'express';
import passport from 'passport';
import container from '../containers/container';
import UserRepository from '../abstractClasses/UserRepository';

const router = express.Router();

export const userRepository = container.get(UserRepository);

userRepository.fillDb();

router.get('/login', (request, response) => {
  response.render('../src/views/pages/login');
});

router.get(
  '/me',
  (request, response, next) => {
    if (!request.isAuthenticated()) {
      return response.redirect('/login');
    }
    return next();
  },
  (request, response) => {
    response.render('../src/views/pages/user-profile', { user: request.user });
  },
);

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: 'login' }),
  (request, response) => {
    response.redirect('/');
  },
);

router.get(
  '/logout',
  (request, response, next) => {
    console.log('logout');
    request.logout(err => {
      if (err) {
        return next(err);
      }
      return response.redirect('/');
    });
  },
);

router.post(
  '/signup',
  async (request, response) => {
    console.log('signUp ', request.body);
    const {
      username, userpassword, dispname, email,
    } = request.body;

    const newUser = await userRepository.createUser({
      username, password: userpassword, displayName: dispname, email,
    });

    if (!newUser) {
      response.status(500);
      throw (new Error('Database Error. Can not create user'));
    }
    response.status(201);
    return response.redirect('login');
  },
);

export default router;
