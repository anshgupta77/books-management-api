


const User = require("../models/user");
const BorrowedRecords = require("../models/borrowRecord");

async function viewBorrowedBook(req, res, next) {
    try {
        if (req.user.role === "admin") {

            req.borrowedrecords = await BorrowedRecords.find({}).populate("userId", "name email").populate("bookId", "title authors price");
        } else {
            const user = await User.findOne({ email: req.user.email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const allBorrowedRecords = await BorrowedRecords.find({}).populate("userId", "name email").populate("bookId", "title authors price");
            console.log(allBorrowedRecords);
            const borrowedrecords = allBorrowedRecords.filter(record =>{
                console.log(user.borrowedBooks[0], record.bookId._id);
                return user.borrowedBooks.includes(record.bookId._id)
            }
            );

            req.borrowedrecords = borrowedrecords;
        }
        next();
    } catch (error) {
        console.error("Error in viewBorrowedBook middleware:", error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    viewBorrowedBook,
};



// const User = require("../models/user");
// const BorrowedRecords = require("../models/borrowRecord");

// async function viewBorrowedBook(req, res, next) {
//     try {
//         if (req.user.role === "admin") {
//             // Admin: Fetch all borrowed records
//             req.borrowedrecords = await BorrowedRecords.find({});
//         } else {
//             // Regular user: Fetch only their borrowed books
//             const user = await User.findOne({ email: req.user.email });
//             if (!user) {
//                 return res.status(404).json({ message: "User not found" });
//             }
//             console.log(user.borrowedBooks);
//             // Fetch all borrowed records
//             const allBorrowedRecords = await BorrowedRecords.find({});

//             // Filter records manually to match user's borrowedBooks array
//             const borrowedrecords = allBorrowedRecords.filter(record =>
//                 user.borrowedBooks.includes(record._id)
//             );

//             req.borrowedrecords = borrowedrecords;
//         }
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error("Error in viewBorrowedBook middleware:", error.message);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// module.exports = {
//     viewBorrowedBook,
// };

