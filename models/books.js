const { mongo, default: mongoose } = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate :{
        type: Date,
    },
    genre:{
        type: String
    },
    price: {
        type: Number,
        min: [0] 
    }

})

module.exports = mongoose.model("books", bookSchema);