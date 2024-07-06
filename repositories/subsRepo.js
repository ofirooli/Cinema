const Sub = require('../models/subsModel')

//Get All
const getAllSubs = (filters) => {
    return Sub.find(filters)
}

//Get by id
const getSubById = (id) => {
    return Sub.findById(id)
}

//Create
const addSub = (obj) => {
    const movie = new Sub(obj)
    return Sub.save()
}

//Update
const updateSub = (id, obj) => {
    return Sub.findByIdAndUpdate(id, obj)
}

//Delete
const deleteSub = (id) => {
    return Sub.findByIdAndDelete(id)
}

module.exports = {getAllSubs, getSubById, addSub, updateSub, deleteSub}