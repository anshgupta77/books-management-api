const express = require("express");
const router = express.Router();

const User = require("../models/user");
const BorrowRecord = require("../models/borrowRecord");
const Book = require("../models/book");

router.get("/", async (req, res) =>{
    try {
        const users = await User.find().populate("borrowedBooks", "title authors price");
        res.json(users);
      } catch (err) {
        res
          .status(500)
          .json({ message: err.message });
      }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post("/", async (req, res) =>{
    const {name, email} = req.body;
    try{
        const result = await User.find({name: name});

        if(result){
            return res.status(404).json({message: "User already exist"});
        }
        const user = await User.create(req.body);
        // const borrowBooks = await BorrowRecord.find();
        // const bookName = await findById()
        res.status(200).json(user);
        
    }catch(err){
        res
        .status(500)
        .json({ message: err.message }); 
    }
})

router.put("/:id/borrow", async (req, res) =>{
    const userId = req.params.id;
    const {borrowedId} = req.body;
    try{
        const book = await Book.findById(borrowedId);
        const user = await User.findById(userId);
        if(!user || !book){
            return res.status(404).json({message: "User or book is not found"});
        }

        if(!book.availability){
            return res.status(404).json({ message: 'Book is already borrowed' });
        }

        book.availability = false;

        const borrowRecord = new BorrowRecord({
            bookId: book._id,
            userId: user._id,
            dueDate: new Date(),
        })
        borrowRecord.save();
        user.borrowedBooks.push(book._id);
        book.assignedTo.push(user._id);

        await user.save();
        await book.save();
        res.status(200).json({message: "Book borrowed successfully", user, book, borrowRecord});

    }catch(err){
        res
        .status(500)
        .json({ message: err.message }); 
    }
})

router.put("/:id/return", async (req, res) =>{
    const userId = req.params.id;
    const {borrowedId} = req.body;
    try{
        const book = await Book.findById(borrowedId);
        console.log(borrowedId);
        const user = await User.findById(userId);
        if(!user || !book){
            return res.status(404).json({message: "User or book is not found"});
        }

        if(book.availability){
            return res.status(404).json({ message: 'Book is already returned' });
        }

        book.availability = true;
        const borrowRecord = await BorrowRecord.findOneAndDelete({bookId: book._id, userId: user._id});

        user.borrowedBooks = user.borrowedBooks.filter(id => id.toString() !== borrowedId);
        book.assignedTo = book.assignedTo.filter(id => id.toString() !== userId);

        await user.save();
        await book.save();

        res.status(200).json({message: "Book returned successfully", user, book, borrowRecord});

        
    }catch(err){
        res
        .status(500)
        .json({ message: err.message }); 
    }
})

// router.put("/:id/return", async (req, res) =>{



module.exports = router;