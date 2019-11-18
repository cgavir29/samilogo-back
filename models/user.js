const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

// Hash password before saving
UserSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    next()
})

// Generate AuthToken
// UserSchema.methods.generateAuthToken = function () {
//     // Generate auth token for the user
//     const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'));
//     return token;
// }

UserSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user that matches email and password
    const user = await User.findOne({ email })
    if (!user) {
        throw { error: 'Invalid login credentials'}
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        throw { error: 'Invalid login credentials'}
    }

    return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User