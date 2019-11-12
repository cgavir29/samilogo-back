const express = require('express')
const router = express.Router()

// Product Model
const Product = require('../../models/product')

// @route   POST api/products
// @desc    Create a product
// @access  Public
router.post('/', (req, res) => {
    Product.create({
        title: req.body.title,
        description: req.body.description
    })
        .then(product => res.status(201).json(product))
        .catch(err => res.status(500).send('There was a problem adding to the database'))
})

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).send('There was a problem finding the products'))
})

// @route   GET api/products
// @desc    Get a product
// @access  Public
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send('Product not found')
            }

            res.json(product)
        })
        .catch(err => res.status(500).send('There was a problem finding the product'))
})

// @route   PUT api/products
// @desc    Modify a product
// @access  Public
router.put('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send('Product not found')
            }

            product.title = req.body.title
            product.description = req.body.description
            product.save()

            res.json(product)
        })
        .catch(err => res.status(500).send('There was a problem updating the product'))
})

// @route   DELETE api/product
// @desc    Delete a product
// @access  Public
router.delete('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send('Product not found')
            }

            product.remove()
            res.status(200).send(`Product: "${product.title}" was deleted`)
        })
        .catch(err => res.status(500).send('There was a problem deleting the product'))
})

module.exports = router