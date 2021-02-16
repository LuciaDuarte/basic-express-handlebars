const express = require('express');
const router = express.Router();
const Book = require('../models/Book.model.js');
const Author = require('../models/Author.model.js');

router.get('/books', (req, res) => {
  Book.find()
    .then(allBooks => {
      res.render('books/books-list', { books: allBooks });
    })
    .catch(e => {
      console.log(e);
    });
});

router.get('/books/create', (req, res) => {
  Author.find()
    .then(authors => {
      res.render('books/book-create', { authors });
    })
    .catch(e => {
      console.log(e);
    });
});

router.post('/books/create', (req, res) => {
  const { title, author, description, rating } = req.body;

  Book.create({ title, author, description, rating })
    .then(() => {
      res.redirect('/books');
    })
    .catch(e => {
      console.log(e);
    });
});

router.post('/books/:bookId/delete', (req, res) => {
  const bookId = req.params.bookId;
  Book.findByIdAndDelete(bookId)
    .then(() => {
      res.redirect('/books');
    })
    .catch(e => {
      console.log(e);
    });
});

router.get('/books/:bookId/edit', (req, res) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .populate('author')
    .then(bookFound => {
      Author.find()
        .then(authorsFound => {
          res.render('books/book-edit', {
            book: bookFound,
            authors: authorsFound
          });
        })
        .catch(e => {
          console.log(e);
        });
    })
    .catch(e => {
      console.log(e);
    });
});

router.post('/books/:bookId/edit', (req, res) => {
  const bookId = req.params.bookId;
  const { title, author, description, rating } = req.body;

  Book.findByIdAndUpdate(bookId, { title, author, description, rating })
    .then(() => {
      res.redirect(`/books/${bookId}`);
    })
    .catch(e => {
      console.log(e);
    });
});

router.get('/books/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  let bookFound = await Book.findById(bookId).populate('author');
  res.render('books/book-details', { book: bookFound });
});

router.post('/reviews/:bookId/add', (req, res) => {
  let bookId = req.params.bookId;
  let { user, comment } = req.body;
  //update the book with user and comments inside
  //the review field
  Book.findByIdAndUpdate(bookId, {
    $push: { reviews: { user, comment } }
  }).then(() => {
    res.redirect(`/books/${bookId}`);
  });
});

router.post('/books/:bookId/reviews/:reviewId/delete', (req, res) => {
  const reviewId = req.params.reviewId;
  const bookId = req.params.bookId;
  Book.findByIdAndUpdate(bookId, {
    $pull: { reviews: { _id: reviewId } }
  }).then(() => {
    res.redirect(`/books/${bookId}`);
  });
});

// router.get('/books/:bookId', (req, res) => {
//   const bookId = req.params.bookId;
//   Book.findById(bookId)
//     .populate('author')
//     .then(bookFound => {
//       res.render('book-details', { book: bookFound });
//     })
//     .catch(e => {
//       console.log(e);
//     });
// });

module.exports = router;
