const express = require('express');
const router = express.Router();
const Author = require('../models/Author.model');

router.get('/authors/create', (req, res, next) => {
  res.render('author-create');
});

router.post('/authors/create', (req, res) => {
  let { name, bio } = req.body;
  Author.create({
    name,
    bio
  }).then(() => {
    res.redirect('/books');
  });
});

module.exports = router;
