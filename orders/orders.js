const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { saveNewOrder, getOrderDetails, getOrderDetailsById } = require('./order-operation');

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Orders service is started!");
})

app.post("/order", (req, res) => {
    console.log(req.body.customerId);
    let newOrder = {
        orderId: req.body.id,
        customerId: req.body.customerId,
        bookId: req.body.bookId,
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }
    saveNewOrder(newOrder)
        .then((data) => [
            res.send('order created successfuly!')
        ]);

})

app.get("/orders", async (req, res) => {
    let orderList = await getOrderDetails();
    res.send(orderList);
})

app.get("/order/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        let order = await getOrderDetailsById(req.params.id);
        res.send(order);
    }
    catch (err) {
        if (err == "No Id found!") {
            res.sendStatus(404);
        }
    }
})

app.listen(4547, () => {
    console.log('Orders service is running!');
})