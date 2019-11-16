const express = require('express')
const router = express.Router()

// User Model
const User = require('../../models/user')

// @route   POST api/users
// @desc    Create a user
// @access  Private
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        city: req.body.city,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
    })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).send(err))
})

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', (req, res) => {
    User.find((err, user) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(user)
    })
})

// @route   GET api/users
// @desc    Get a user
// @access  Private
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err)
        if (!user) {
            return res.status(404).send('User not found')
        }
        return res.status(200).send(user)
    })
})

// @route   PUT api/users
// @desc    Modify a user
// @access  Private
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, user) => {
            if (err) return res.status(500).send(err)
            if (!user) {
                return res.status(404).send('User not found')
            }
            return res.status(200).send(user)
        })
})

// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err)
        if (!user) {
            return res.status(404).send('User not found')
        }
        return res.status(200).send('User successfully deleted')
    })
})

module.exports = router