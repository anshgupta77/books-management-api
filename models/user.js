const mongoose = require("mongoose");

const borrowedBooksSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
    },
    dateIssued: Date,
    dueDate: Date,
    returnDate: Date,
})


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    borrowed_books: {
        type: [borrowedBooksSchema],
        defualt: []
    }
})

module.exports = mongoose.model("Users", userSchema);