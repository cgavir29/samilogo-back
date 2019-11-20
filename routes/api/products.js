const express = require('express')
const router = express.Router()

// Product Model
const Product = require('../../models/product')

// @route   POST api/products
// @desc    Create a product
// @access  Private
router.post('/', (req, res) => {
    Product.create({
        title: req.body.title,
        description: req.body.description
    })
        .then(product => res.status(201).json(product))
        .catch(err => res.status(500).send(err))
})

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
    Product.find((err, products) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(products)
    })
})

// @route   GET api/products
// @desc    Get a product
// @access  Public
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return res.status(500).send(err)
        if (!product) {
            return res.status(404).send('Product not found')
        }
        return res.status(200).send(product)
    })
})

// @route   PUT api/products
// @desc    Modify a product
// @access  Private
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
        $push: { 'reviews': req.body.review }
    }, { new: true }, (err, product) => {
        if (err) return res.status(500).send(err)
        if (!product) {
            return res.status(404).send('Product not found')
        }
        return res.status(200).send(product)
    })
})

// @route   DELETE api/product
// @desc    Delete a product
// @access  Private
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err) return res.status(500).send(err)
        if (!product) {
            return res.status(404).send('Product not found')
        }
        return res.status(200).send('Product successfully deleted')
    })
})

module.exports = router