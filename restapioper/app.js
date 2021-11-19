const express = require ('express');

const app = express ();

let books = require ('./users.json');

let obj = {};

app.use (express.json ());

const logger = (req, res, next) => {
  obj.api_requested = 'Nilesh';
  next ();
};

app.get ('/', logger, (req, res) => {
  obj.books = books;
  res.send (obj);
  obj = {};
});

app.post ('/books', logger, (req, res) => {
  let newBook = [...books, req.body];
  obj.books = newBook;
  res.send (obj);
  obj = {};
});

app.get ('/books/:id', logger, (req, res) => {
  let book = books.filter (b => {
    return b.id == req.params.id;
  });
  obj['book'] = book[0];
  res.send (obj);
  obj = {};
});

app.patch ('/books/:id', logger, (req, res) => {
  let newBooks = books.map (book => {
    if (book.id == req.params.id) {
      book = req.body;
    }
    return book;
  });
  obj.books = newBooks;
  res.send (obj);
  obj = {};
});

app.delete ('/books/:id', logger, (req, res) => {
  let newBooks = books.filter (book => {
    return book.id != req.params.id;
  });
  obj.books = newBooks;
  res.send (obj);
});

app.listen (2344, (req, res) => {
  console.log ('listening to 2344');
});
