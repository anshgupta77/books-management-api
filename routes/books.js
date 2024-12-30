const express = require('express');

const router = express();
const Book = require("../models/books")
router.use(getAllBooks); //write the middleware in the end.

router.get("/", (req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.query);
    res.json(req.books);
});

router.get("/:id",async (req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log("Fetching:", req.params.id);
    console.log(req.query);
    console.log(Book);
    try{
        const book = await Book.findById(req.params.id);
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
    const {  title, author, publishedDate , genre, price } = req.body;
    try{

        //method 1 saved.
        // const newBook = new Book({ title, author, publishedDate, genre, price });
        // const result = await newBook.save();
        // res.json(result);


        //method 2 create.

        const result = await Book.create({  title, author, publishedDate , genre , price });
        res.json(result);  // it directly save in single step only
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

router.patch("/:title", async(req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log("Editing:", req.params.title);
    console.log(req.body);

    const {  title, author, publishedDate , genre, price } = req.body;

    try {
        const result =  await Book.findOneAndUpdate({title: req.params.title}, 
        { title, author, publishedDate , genre, price },
        {new: true} // return updated documents.
        )
        if (!result) {
            return res.status(404).json({ message: `Book with the title :  "${req.params.title}" not found` });
        }
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
        return;
    }
});

router.delete("/:title",  async(req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log("Deleting:", req.params.title);

    try{
        const result = await Book.findOneAndDelete(
            {title: req.params.title},
        )
        if(!result){
            return res.status(404).json({ message: `Book with the title :  "${req.params.title}" not found` }); 
        }
        res.json(result);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

router.get("/genre/:genre", async (req, res) =>{
    console.log(req.method)
    console.log(req.url);
    // const genre = req.params.genre;
    try{
        const result = await Book.find({genre: req.params.genre})
        if(!result){
            return res.status(500).json({message: `Book with the title :  "${req.params.genre}" not found`})
        }
        res.json(result);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    
    }
})



async function getAllBooks(req, res, next){
    try {
        const books  = await Book.find();
        req.books = books;
        next();
    } catch (error) {
        res.status(500).json({ message: err.message });
        return;
    }
}

module.exports = router