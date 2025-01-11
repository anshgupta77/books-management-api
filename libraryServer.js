const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const db = require('./connection')
require("./mongoose_connection");
const collection = db.collection('books')

const app = express();

app.use(express.json());

app.get("/", async(req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.query);
  const cursor = collection.find()
  const results = await cursor.toArray()
  res.json(results);
});


const bookRouter = require("./routes/book");
app.use("/books", bookRouter);

const authorRouter = require("./routes/author");
app.use("/authors", authorRouter)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});