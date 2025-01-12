const mongoose = require("mongoose");

const BorrowRecordSchema = mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      bookId: {
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
      default: function(){
        const due = new Date();
        due.setDate(due.getDate() + 7);
        return due;
      }
    },
    returnDate: {
      type: Date,
    },
    
  },
);

const BorrowRecord = mongoose.model("BorrowRecord", BorrowRecordSchema);
module.exports = BorrowRecord;