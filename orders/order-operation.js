const fs = require('fs');
const path = require('path');
const orderDbFile = path.join(__dirname, "db", "orderDb.json");
const axios = require('axios');

const saveNewOrder = (newOrder) => {
    let dbData = [];
    return new Promise((res, rej) => {
        fs.readFile(orderDbFile, { encoding: 'utf8' }, (err, data) => {
            if (data.length > 0) {
                dbData = JSON.parse(data);
            }
            dbData.push(newOrder);
            fs.writeFile(orderDbFile, JSON.stringify(dbData), () => {
                res(dbData);
            });
        });
    })
}

const getOrderDetails = () => {
    let dbData = [];
    return new Promise((res, rej) => {
        fs.readFile(orderDbFile, { encoding: 'utf8' }, (err, data) => {
            if (!err) {
                if (data.length == 0) {
                    res("");
                }
                dbData = JSON.parse(data)
                res(dbData);
            }
            else {
                rej();
            }
        });
    })
}

const getOrderDetailsById = (id) => {
    let dbData = [];

    return new Promise((res, rej) => {
        fs.readFile(orderDbFile, { encoding: 'utf8' }, async (err, data) => {
            let noIdFound = false;
            if (!err) {
                dbData = JSON.parse(data)
                if (dbData.length === 0) {
                    res();
                }

                dbData.forEach(async object => {
                    if (object["orderId"] == id) {
                        noIdFound = false;
                        let custName = await getCustomerName(object.customerId)
                        let bookTitle = await getBookName(object.bookId);
                        let orderDetails = {
                            orderId: object.orderId,
                            customerName: custName,
                            bookName: bookTitle,
                            initialDate: object.initialDate,
                            deliveryDate: object.initialDate
                        }
                        res(orderDetails)
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

// Call customer microservice.
const getCustomerName = (customerId) => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:4546/customer/" + customerId)
            .then((response) => {
                let result = response.data.name;
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

// // Call Book microservice.
const getBookName = (bookId) => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:4545/book/" + bookId)
            .then((response) => {
                let result = response.data.title;
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

module.exports = { saveNewOrder, getOrderDetails, getOrderDetailsById };