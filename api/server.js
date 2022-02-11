const express = require("express");

const carsRouter = require('./cars/cars-router');

const server = express()

server.use(express.json());

server.use('/api/cars', carsRouter);

server.use("*", (req, res) => {
    res.send(`<h1>API is up!</h1>`);
})

module.exports = server
