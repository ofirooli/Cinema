const mongoose = require('mongoose')

const movieShcema = new mongoose.Schema(
    {
        id: {type: String, required: false},
        Name: {type: String, required: true},
        YearPremiered: {type: Number, required: true},
        Genres: {type: [String], required: true},
        imageURL: {type: String, required: false},
    }
)

const Movie = mongoose.model('movie', movieShcema, 'movies')

module.exports = Movie