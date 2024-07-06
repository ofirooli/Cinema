const express = require('express')
const userService = require('../services/usersService')

const router = express.Router()

//Get all users
router.get('/', async (req, res) => {
    try {
        const filters = req.query
        const users = await userService.getAllUsers(filters)
        res.send(users)
    }
    catch(error) {
        res.send(error)
    }
})

//Get user by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await userService.getUserById(id)
        res.send(user)
    }
    catch(error) {
        res.send(error)
    }
})

//Create new user
router.post('/', async (req, res) => {
    try {
        const obj = req.body
        const result = await userService.addUser(obj)
        res.status(201).send(result)
    }
    catch (error) {
        res.send(error)
    }
})

//Update a user
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const obj = req.body
        const result = await userService.updateUser(id, obj)
        res.send(result)
    }
    catch (error) {
        res.send(error)
    }
})

//Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await userService.deleteUser(id)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router