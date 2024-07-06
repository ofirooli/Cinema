const mongoose = require('mongoose')

const userShcema = new mongoose.Schema(
    {
        id: {type: String, required: false},
        fullName: {type: String, required: true},
        userName: {type: String, required: true},
        password: {type: String, required: true},
        
    }
)

const User = mongoose.model('user', userShcema, 'users')

module.exports = User