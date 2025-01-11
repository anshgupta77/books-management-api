const express = require('express');

const router = express();
const Book = require("../models/book");
const Author = require("../models/author");

const {getAllBooks, getBookById, addBook, updateBook, deleteBook, findBookByGenre} = require("../controlllers/books");


router.get("/", async (req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.query);
     try {
        const books  = await Book.find().populate("authors", "name nationality");
        res.json(books);
      }catch (error) {
        res.status(500).json({ message: err.message });
        return;
    }
});

router.get("/:id",async (req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log("Fetching:", req.params.id);
    console.log(req.query);
    console.log(Book);
    try{
        const book = await Book.findById(req.params.id).populate("authors", "name nationality");
        console.log(book);
        res.json(book);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
    });

router.post("/", async(req, res) => {
    console.log(req.method);
    console.log(req.body);
    const {  title, authors, publishedYear , genres, price } = req.body;
    try{
        const authorIds = [];
        for(const author of authors){
        
            let existingAuthor = await Author.findOne({name: author.name});
            if(!existingAuthor){
                const newAuthor = new Author(author);
                existingAuthor = await newAuthor.save();
                console.log(existingAuthor);
  
            }

            authorIds.push(existingAuthor._id);

        }

        const newBook = new Book({
            title,
            price,
            authors: authorIds,
            genres,
            publishedYear
        });
        const book = await newBook.save();
        authorIds.map(async (authorId)=>{
           const author = await Author.findById(authorId);
           author.books.push(book._id);
            author.save();
            console.log(author);
        })

        res.status(201).json(book);
        
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});





module.exports = router;
