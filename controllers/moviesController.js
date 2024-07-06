const express = require('express');
const movService = require('../services/moviesService');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const filters = req.query;
        const movies = await movService.getAllMovies(filters);
        res.send(movies);
    } catch (error) {
        res.status(500).send(error); 
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movService.getMovieById(id);
        res.send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const obj = req.body;
        const result = await movService.addMovie(obj);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await movService.updateMovie(id, obj);
        res.send(result);
    } catch (error) {
        
        res.status(500).send(error);
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await movService.deleteMovie(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
