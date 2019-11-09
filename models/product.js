const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requierd: true
    }
})

module.exports = Product = mongoose.model('product', ProductSchema)