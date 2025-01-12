const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type: String,

    },
    password:{
        type: String,
    },
    role:{
        type: String,
        default: "user",
    },
    borrowedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
    }]
})

module.exports = mongoose.model("Users", userSchema);