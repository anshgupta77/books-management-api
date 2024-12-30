const express = require('express');

const router = express();
const Book = require("../models/books");



const {getAllBooks,getBookById,addBook,updateBook,deleteBook ,findBookByGenre} = require("../controlllers/books");


router.get("/", getAllBooks);

router.get("/:id",getBookById);

router.post("/", addBook);

router.patch("/:title", updateBook);

router.delete("/:title",  deleteBook);

router.get("/genre/:genre", findBookByGenre)





module.exports = router