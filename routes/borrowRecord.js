const express = require("express");
const router = express.Router();

const BorrowRecord = require("../models/borrowRecord");
const {viewBorrowedBook} = require("./../middleware/borrowedBookAuthetication");
const {authToken} = require("../middleware/authentication")

router.get("/",authToken, viewBorrowedBook,async (req, res) => {
    try {
        // const borrowRecords = await req.borrowedrecords.find().populate("userId", "name email").populate("bookId", "title authors price");
        res.json(req.borrowedrecords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
   
});

module.exports = router;