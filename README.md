# Library Microservice.

This project aims to build a small microservice for Library case study.

## Installation

Run the following commands:

``` 
git clone git@github.com:bhatshriram/Library-Microservice.git
cd books
npm install
cd..
cd customers
npm install
cd..
cd orders
npm install
cd..
```

## Services

There are three backend services named as books service, customers service and orders service.

### Start

For the quickest start, have [PM2](http://pm2.keymetrics.io) installed globally and then just type:

``` 
pm2 start app.json
```

This will run all the 3 services we have.

Books service will be available in [http://localhost:4545](http://localhost:4545) and stores the data in booksDb.json.

Customers service will be available in [http://localhost:4546](http://localhost:4546) and stores the data in customersDb.json.

Orders service will be available in [http://localhost:4547](http://localhost:4547) and stores the data in ordersDb.json.

Use Get and Post with these services to know how this works.

### Operations for Books Service:

    Get  - http://localhost:4545/ - Service start message.
    Get  - http://localhost:4545/books - Lists all the books.
    Get  - http://localhost:4545/book/:id - Fetch the book details with id.
    Post - http://localhost:4545/book - Save a new book object.

### Operations for Customers Service:

    Get  - http://localhost:4546/ - Service start message.
    Get  - http://localhost:4546/customers - Lists all the customers.
    Get  - http://localhost:4546/customer/:id - Fetch the customer details with id.
    Post - http://localhost:4546/customer - Save a new customer object.

### Operations for Orders Service:

    Get  - http://localhost:4547/ - Service start message.
    Get  - http://localhost:4547/orders - Lists all the orders.
    Get  - http://localhost:4547/orders/:id - Fetch the order details with book name and customer name by calling other two microservices.
    Post - http://localhost:4547/order - Save a new order object.

## Example Data

### Example Data for Books:

``` 
    "id": 10,
    "title": "Java Headfirst",
    "author": "Kathy",
    "pages": 700,
    "publisher": "O'Reilly Media"
```

### Example Data for Customers:

``` 
    "id": 110,
    "name": "Professor",
    "age": 45,
    "address": "Thailand"
```

### Example Data for Orders:

``` 
    "orderId": 1010,
    "customerId": 110,
    "bookId": 10,
    "initialDate": "2020-03-20",
    "deliveryDate": "2020-05-28"
```

## Dockerization

We can run each service in seperate docker containers using below commands:

```
cd books
docker build -t books .
docker run -dp 4545:4545 books

cd customers
docker build -t customers .
docker run -dp 4546:4546 customers

cd orders
docker build -t orders .
docker run -dp 4547:4547 orders
```
