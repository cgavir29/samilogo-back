const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// Generate AuthToken
// UserSchema.methods.generateAuthToken = function () {
//     // Generate auth token for the user
//     const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'));
//     return token;
// }

const User = mongoose.model('User', UserSchema)

module.exports = User