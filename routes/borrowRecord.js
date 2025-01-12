const express = require("express");
const router = express.Router();

const BorrowRecord = require("../models/borrowRecord");

router.get("/", async (req, res) => {
    try {
        const borrowRecords = await BorrowRecord.find();
        res.json(borrowRecords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
   
});

module.exports = router;