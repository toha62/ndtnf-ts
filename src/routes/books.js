import express from 'express';
import axios from 'axios';
import upload from '../middleware/upload';
import container from '../containers/container';
import BookRepository from '../book/BookRepository';

const router = express.Router();
const COUNTER_URL = process.env.COUNTER_URL || 'locallhost';
const instance = axios.create({
  baseURL: COUNTER_URL,
});

const bookRepository = container.get(BookRepository);

bookRepository.fillDb();

router.get('/', async (request, response) => {
  const books = await bookRepository.getBooks();

  if (books) {
    return response.render('../src/views/pages/index', { books, user: request.user });
  }
  return response.status(404);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const book = await bookRepository.getBook(id);

    if (!book) {
      throw (new Error(`id: ${id} not found in database or other error occured while getting bok from db`));
    }
    await instance.post(`/counter/${id}/incr`);

    const counterResponse = await instance.get(`/counter/${id}`);

    response.render('../src/views/pages/view', { book, counter: counterResponse.data });
  } catch (err) {
    response.status(404).json(err);
  }
});

router.get('/update/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const book = await bookRepository.getBook(id);

    if (!book) {
      throw (new Error(`id: ${id} not found in database or other error occured while getting bok from db`));
    }

    response.render('../src/views/pages/update', { book });
  } catch (err) {
    response.status(404).json(err);
  }
});

router.post(
  '/',
  upload.fields([{ name: 'book-file', maxCount: 1 }, { name: 'cover-file', maxCount: 1 }]),
  async (request, response) => {
    if (request.files['book-file'] && request.files['cover-file']) {
      const {
        title, authors, description, favorite,
      } = request.body;
      // const fileBook = request.files['book-file'][0].filename;
      const fileCover = request.files['cover-file'][0].filename;
      const fileName = request.files['book-file'][0].originalname;

      const newBookData = {
        title, authors, description, favorite, fileCover, fileName,
      };

      const book = await bookRepository.createBook(newBookData);

      if (!book) {
        response.status(500);
        throw (new Error('Database Error. Can not create book'));
      }
      response.status(201);
      return response.redirect('/api/books');
    }
    return response.json('File not found');
  },
);

router.post(
  '/:id',
  upload.fields([{ name: 'book-file', maxCount: 1 }, { name: 'cover-file', maxCount: 1 }]),
  async (request, response) => {
    if (request.files['book-file'] && request.files['cover-file']) {
      const { id } = request.params;

      const {
        title, authors, description, favorite,
      } = request.body;
      // const fileBook = request.files['book-file'][0].filename;
      const fileCover = request.files['cover-file'][0].filename;
      const fileName = request.files['book-file'][0].originalname;

      const updateBook = {
        title, authors, description, favorite, fileCover, fileName,
      };

      const book = await bookRepository.updateBook(id, updateBook);

      if (!book) {
        response.status(500);
        throw (new Error(`Database Error. Can not udate book with id: ${id}`));
      }
      response.status(200);
      return response.redirect('/api/books');
    }
    return response.json('File not found');
  },
);

router.get('/delete/:id', async (request, response) => {
  const { id } = request.params;

  if (await bookRepository.deleteBook(id)) {
    return response.redirect('/api/books');
  }
  return response.status(404);
});

// router.get('/:id/download', (request, response) => {
//   const { id } = request.params;
//   const index = library.findIndex(item => item.id === id);

//   if (index === -1) {
//     response.status(404);
//     return response.json('404 Страница не найдена');
//   }

//   return response.download(`${__dirname}/../storage/${library[index].fileBook}`, err => {
//     if (err) {
//       response.status(404).json(err);
//     }
//   });
// });

export default router;
