const express = require('express')
const subsService = require('../services/subsService')

const router = express.Router()

//Get all subscriptions
router.get('/', async (req, res) => {
    try {
        const filters = req.query
        const subs = await subsService.getAllSubs(filters)
        res.send(subs)
    }
    catch(error) {
        res.send(error)
    }
})

//Get sub by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const sub = await subsService.getSubById(id)
        res.send(sub)
    }
    catch(error) {
        res.send(error)
    }
})

//Create new sub
router.post('/', async (req, res) => {
    try {
        const obj = req.body
        const result = await subsService.addSub(obj)
        res.status(201).send(result)
    }
    catch (error) {
        res.send(error)
    }
})

//Update a sub
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const obj = req.body
        const result = await subsService.updateSub(id, obj)
        res.send(result)
    }
    catch (error) {
        res.send(error)
    }
})

//Delete a sub
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await subsService.deletesub(id)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router