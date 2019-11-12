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
        .catch(err => res.status(500).send('There was a problem adding to the database'))
})

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).send('There was a problem finding the users'))
})

// @route   GET api/users
// @desc    Get a user
// @access  Private
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found')
            }

            res.json(user)
        })
        .catch(err => res.status(500).send('There was a problem finding the user'))
})

// @route   PUT api/users
// @desc    Modify a user
// @access  Private
router.put('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(400).send('User not found')
            }

            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password
            user.age = req.body.age
            user.city = req.body.city
            user.address = req.body.address
            user.isAdmin = req.body.isAdmin
            user.save()

            res.json(user)
        })
        .catch(err => res.status(500).send('There was a problem updating the user'))
})

// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found')
            }

            user.remove()
            res.status(200).send(`User: "${user.name}" was deleted`)
        })
        .catch(err => res.status(500).send('There was a problem deleting the user'))
})

module.exports = router