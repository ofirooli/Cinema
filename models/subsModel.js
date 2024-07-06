const mongoose = require('mongoose')

const subsShcema = new mongoose.Schema(
    {
        id: {type: String, required: false},
        movieID: {type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true},
        MemberID: {type: mongoose.Schema.Types.ObjectId, ref: "member", required: true},
        Date: {type: String, required: true}
    }
)

const Sub = mongoose.model('sub', subsShcema, 'subs')

module.exports = Sub