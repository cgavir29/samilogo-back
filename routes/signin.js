const express = require('express')
const router = express.Router()

// User Model
const User = require('../models/user')

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)

        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router