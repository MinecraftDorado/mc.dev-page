
const mongoose = require('./mongoose')

const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} rol invalid'
}

const userSchema = new mongoose.Schema({
    local: {
        username: String,
        password: String
    },
    role: {
        type: String,
        default: 'USER',
        required: [true],
        enum: roles
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/img/avatar.jpg'
    }
})

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
}
module.exports = {
    User: mongoose.register.model('User', userSchema),
    roles: roles
}