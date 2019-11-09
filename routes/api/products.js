const express = require('express')
const router = express.Router()

// Product Model
const Product = require('../../models/product')

// @route   POST api/products
// @desc    Create a product
// @access  Public
router.post('/', (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description
    })

    newProduct.save().then(product => res.json(product))
})

// @route   GET api/books
// @desc    Gell all books
// @access  Public
router.get('/', (req, res) => {
    Product
        .find()
        .then(Products => res.json(products))
        .catch(err => console.log(err))
})

// @route   GET api/products
// @desc    Get a product
// @access  Public
router.get('/:id', (req, res) => {
    Product
        .findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => console.log(err))
})

module.exports = router