const Movie = require('../models/movieModel')

//Get All
const getAllMovies = (filters) => {
    return Movie.find(filters)
}

//Get by id
const getMovieById = (id) => {
    return Movie.findById(id)
}

//Create
const addMovie = (obj) => {
    const movie = new Movie(obj)
    return movie.save()
}

//Update
const updateMovie = (id, obj) => {
    return Movie.findByIdAndUpdate(id, obj)
}

//Delete
const deleteMovie = (id) => {
    return Movie.findByIdAndDelete(id)
}

module.exports = {getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie}