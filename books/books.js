const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { saveNewBook, getAllBooks, getBookById } = require('./book-operation');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('book service is started!');
});

app.post("/book", (req, res) => {
    try {
        let newBook = {
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            pages: req.body.pages,
            publisher: req.body.publisher
        }
        saveNewBook(newBook);
        res.send('The book data saved successfully!')
    }
    catch (err) {
        if (err) throw err;
    }
});

app.get("/books", async (req, res) => {
    let bookList = await getAllBooks();
    res.send(bookList);
});

app.get("/book/:id", async (req, res) => {
    try {
        let book = await getBookById(req.params.id);
        res.send(book);
    }
    catch (err) {
        if (err == "No Id found!") {
            res.sendStatus(404);
        }
    }
});

app.listen(4545, () => {
    console.log('Books service is running!');
})