const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema(
    {
        id: {type: String, required: false},
        email: {type: String, required: true},
        city: {type: String, required: true},
        userID: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}
    }
)

const Member = mongoose.model('Member', memberSchema, 'members')

module.exports = Member