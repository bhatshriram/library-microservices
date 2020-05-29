const fs = require('fs');
const path = require('path');
const bookDbFile = path.join(__dirname, "db", "booksdb.json");

const saveNewBook = (newBook) => {
    let dbData = [];
    fs.readFile(bookDbFile, { encoding: 'utf8' }, (err, data) => {
        if (data.length > 0) {
            dbData = JSON.parse(data);
        }
        dbData.push(newBook);
        fs.writeFile(bookDbFile, JSON.stringify(dbData), () => {
            console.log('success');
        });
    });
}

const getAllBooks = () => {
    return new Promise((res, rej) => {
        fs.readFile(bookDbFile, { encoding: 'utf8' }, (err, data) => {
            if (!err) {
                res(JSON.parse(data))
            }
            else {
                rej();
            }
        });
    })
}

const getBookById = (id) => {
    let dbData = [];
    return new Promise((res, rej) => {
        fs.readFile(bookDbFile, { encoding: 'utf8' }, (err, data) => {
            let noIdFound = false;
            if (!err) {
                dbData = JSON.parse(data)
                if (dbData.length === 0) {
                    res();
                }
                dbData.forEach(object => {
                    if (object["id"] == id) {
                        noIdFound = false;
                        res(object)
                    } else {
                        noIdFound = true;
                    }
                });
                if (noIdFound) {
                    rej('No Id found!');
                }
            }
            else {
                rej();
            }
        });
    })
}

module.exports = { saveNewBook, getAllBooks, getBookById };