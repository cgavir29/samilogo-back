const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    user: Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now()
    },
    comment: String
})

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requierd: true
    },
    reviews: [ReviewSchema]
})

const Product = mongoose.model('product', ProductSchema)
module.exports = Product