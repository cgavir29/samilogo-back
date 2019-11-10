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

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
    Product
        .find()
        .then(products => res.json(products))
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

// @route   PUT api/products
// @desc    Modify a product
// @access  Public
router.put('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.title = req.body.title
            product.description = req.body.description
            product.save().then(product => res.json(product))
        })
        .catch(err => console.log(err))
})

// @route   DELETE api/product
// @desc    Delete a product
// @access  Public
router.delete('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => product.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router