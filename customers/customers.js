const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { getAllCustomers, saveNewCustomer, getCustomerById } = require('./customer-operation');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Customers service is started!');
})

app.get("/customers", async (req, res) => {
    let customerList = await getAllCustomers();
    res.send(customerList);
})

app.post("/customer", (req, res) => {
    try {
        let newCustomer = {
            id: req.body.id,
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
        }
        saveNewCustomer(newCustomer);
        res.send('The customer data saved successfully!')
    }
    catch (err) {
        if (err) throw err;
    }
})

app.get("/customer/:id", async (req, res) => {
    try {
        let customer = await getCustomerById(req.params.id);
        res.send(customer);
    }
    catch (err) {
        if (err == "No Id found!") {
            res.sendStatus(404);
        }
    }
});

app.listen(4546, () => {
    console.log('Service started!');
})