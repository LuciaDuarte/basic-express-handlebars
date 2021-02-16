# Welcome to a basic Express.js & Handlebars project

This repo contains a project with basic features like authentication, CRUD operations, Cloudinary and Google Maps API with Express.js and Handlebars. It's very raw, with only the essencial code for each feature.

Check the app.js to see every import that is made.

## CRUD Operations

Every CRUD operation is done with the _books_.

- Create
  To check how to create a book, see the creation form in views/books/book-create.hbs and the route in routes/book.js.
- Read
  See the list in views/books/books-list and the detail in views/books/book-detail. The routes in routes/book.js.
- Update
  To update a book, see the form in views/books/book-edit.hbs and the route in routes/book.js.
- Delete
  To delete a book, see the delete form/button in views/books/books-list.hbs and the route in routes/book.js. Each delete triggers a confirm message done with a script in books-list.hbs.

There's also the creation of authors for books to demonstrate one-to-many connections with mongoose. Check the views/author-create.hbs and routes/author.js for that.

## Authentication

It's possible to signup and login to access private pages.
The authentication route can be seen in routes/auth.js and the forms in views/auth.
There's a secret page accessible with login and one only for admin users. These requireLogin and checkRoles functions can be seen in routes/index.js.

## Cloudinary API

The connection to Cloudinary can be seen in _movies_.

There's a creation form for movies that allows the upload of pictures in views/movies/movie-create.hbs and a route in routes/movies.js.

## Google Maps API

The connection to Google Maps can be seen in _map_.
There's a calculate route example and a show markers in map example.

Check the views/map.hbs, the routes/index.js and the public/javascripts/script.js. Also the layout.hbs where the Google Map script is imported.
