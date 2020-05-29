const fs = require('fs');
const path = require('path');
const customerDbFile = path.join(__dirname, "db", "customerDb.json");


const getAllCustomers = () => {
    let dbData = [];
    return new Promise((res, rej) => {
        console.log(customerDbFile);
        fs.readFile(customerDbFile, { encoding: 'utf8' }, (err, data) => {
            if (!err) {
                dbData = data;
                if (dbData.length == 0) {
                    res('No Data');
                } else {
                    res(JSON.parse(dbData))
                }
            }
            else {
                rej();
            }
        });
    })
}

const saveNewCustomer = (newCustomer) => {
    let dbData = [];
    fs.readFile(customerDbFile, { encoding: 'utf8' }, (err, data) => {
        if (data.length > 0) {
            dbData = JSON.parse(data);
        }
        dbData.push(newCustomer);
        fs.writeFile(customerDbFile, JSON.stringify(dbData), () => {
            console.log('success');
        });
    });
}

const getCustomerById = (id) => {
    let dbData = [];
    return new Promise((res, rej) => {
        fs.readFile(customerDbFile, { encoding: 'utf8' }, (err, data) => {
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

module.exports = { getAllCustomers, saveNewCustomer, getCustomerById }