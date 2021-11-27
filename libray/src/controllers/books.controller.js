const express = require ('express');

const Book = require ('../models/books.model');

const router = express.Router ();

// 1----find books that are checked out(no assigned as 1 used directly)
// 2---find all books written by an author
// 3---find books in a section
// 4---find books in a section that are not checked out
// 5---find books of 1 author inside a section

router.post ('', async (req, res) => {
  try {
    const book = await Book.create (req.body);
    console.log (book);
    return res.status (201).send (book);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('', async (req, res) => {
  console.log ('getall');
  try {
    const books = await Book.find ()
      .populate ('section_id')
      .populate ('author_ids')
      .populate ('user_id')
      .lean ()
      .exec ();
    console.log (res);
    return res.status (201).send (books);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('/2/:first_name', async (req, res) => {
  try {
    const books = await Book.find ()
      .populate ('section_id')
      .populate ('author_ids')
      .lean ()
      .exec ();
    let arr = [];
    books.forEach (el => {
      let authors = el.author_ids;
      let result = false;
      authors.forEach (le => {
        console.log (le.first_name);
        if (
          le.first_name === req.params.first_name &&
          !arr.includes (le.first_name)
        ) {
          result = true;
        }
        // arr.push (le.findById (req.params.id));
      });
      if (result) {
        arr.push (el.book_name);
      }
    });
    return res.status (201).send (arr);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/3/:section_name', async (req, res) => {
  try {
    const books = await Book.find ()
      .populate ('section_id')
      .populate ('author_ids')
      .lean ()
      .exec ();
    let arr = [];

    books.forEach (el => {
      let le = el.section_id;
      console.log (le);
      console.log (req.params.section_name, le.section_name);
      if (le.section_name === req.params.section_name) {
        arr.push (el.book_name);
      }
      // arr.push (le.findById (req.params.id));
    });
    return res.status (201).send (arr);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('/1/books', async (req, res) => {
  try {
    const books = await Book.find ({user_id: {$ne: undefined}})
      .populate ('user_id')
      .lean ()
      .exec ();

    return res.status (201).send (books);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/books/:author_name', async (req, res) => {
  try {
    const books = await Book.find ().populate ('author_ids').lean ().exec ();
    let arr = [];
    books.forEach (book => {
      let author = book.author_ids;
      author.forEach (a => {
        if (a.first_name == req.params.author_name) {
          arr.push (book.book_name);
        }
      });
    });

    return res.status (201).send (arr);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/books/*/:section_name', async (req, res) => {
  try {
    const books = await Book.find ().populate ('section_id').lean ().exec ();
    let arr = [];
    // console.log (books);
    books.forEach (book => {
      // console.log (book.section_id.section_name);
      if (book.section_id.section_name == req.params.section_name) {
        arr.push (book.book_name);
      }
    });

    return res.status (201).send (arr);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/:section_name', async (req, res) => {
  try {
    const books = await Book.find ({user_id: {$eq: undefined}})
      .populate ('section_id')
      .lean ()
      .exec ();
    let arr = [];
    console.log (books);
    books.forEach (book => {
      console.log (book.section_id.section_name);
      if (book.section_id.section_name == req.params.section_name) {
        arr.push (book.book_name);
      }
    });

    return res.status (201).send (arr);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('/5/:section_name/:author_name', async (req, res) => {
  try {
    const books = await Book.find ()
      .populate ('section_id')
      .populate ('author_ids')
      .lean ()
      .exec ();
    let arr = [];
    console.log (books);
    books.forEach (book => {
      console.log (req.params.section_name, req.params.author_name);
      let author = book.author_ids;
      author.forEach (aut => {
        console.log (book.section_id.section_name, aut.first_name);
        if (
          book.section_id.section_name == req.params.section_name &&
          aut.first_name === req.params.author_name
        ) {
          console.log ('true');
          arr.push (book.book_name);
        }
      });
    });

    return res.status (201).send (arr);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('/:id', async (req, res) => {
  console.log (params);
  try {
    const book = await Book.findById (req.params.id);
    console.log (res);
    res.status (201).send (book);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('/chekout/:id', async (req, res) => {
  // console.log (params);
  try {
    const book = await Book.findById (req.params.id);
    console.log (res);
    res.status (201).send ('hello');
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.patch ('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
    })
      .lean ()
      .exec ();

    return res.status (201).send (book);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.delete ('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete (req.params.id).lean ().exec ();

    return res.status (201).send (book);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
module.exports = router;
