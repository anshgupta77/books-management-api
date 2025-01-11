const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    nationality: {
      type: String,
      trim: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
      },
    ],
  }
);

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;