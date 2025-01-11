const mongoose = require("mongoose");

const BorrowRecordSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      validate: {
        validator: function (val) {
          return !val || val > this.borrowDate;
        },
        message: "Return date must be after borrow date.",
      },
    },
  },
  { timestamps: true }
);

const BorrowRecord = mongoose.model("BorrowRecord", BorrowRecordSchema);
module.exports = BorrowRecord;