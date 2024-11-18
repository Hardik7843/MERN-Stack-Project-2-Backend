const ProductRouter = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth')

ProductRouter.get('/', ensureAuthenticated, (request, response) => {
    response.status(200).json([
        {
            name : "Mobile",
            price : 10000
        },
        {
            name : "Television",
            price : 40000
        }
    ])
})

module.exports = ProductRouter
