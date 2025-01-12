const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    }],
    publishedYear :{
        type: Date,
    },
    genres:{
        type: [String],
        enum: [
            "Fiction",
            "Non-Fiction",
            "Science",
            "History",
            "Biography",
            "Other",
          
        ],
        default: "Other"
    },
    price: {
        type: Number,
        min: [0, "Price must be positive number"] 
    },
    availability :{
        type: Boolean,
        default: true,
      },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

})

module.exports = mongoose.model("Books", bookSchema);