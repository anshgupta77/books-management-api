const express = require("express");

const router = express.Router();
const Author = require('../models/author');
// const {
//   getAuthors,
//   addAuthor,
//   getAuthorById,
// } = require("../controllers/authorController");

router.get("/", async function (req, res){
    try {
      const authors = await Author.find().populate(
        "books",
        "title price genres publishedYear"
      );
      res.json(authors);
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message });
    }
});

router.post("/", async function (req, res){
        try {
          const newAuthor = await new Author(req.body);
          const result = await newAuthor.save();
          res.status(201).json(result);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: err.message });
          return;
        }
     
    });

router.get("/:id", async function (req, res){
    try {
      const author = await Author.findById(req.params.id);
      res.json(author);
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message });
    }
  });

module.exports = router;