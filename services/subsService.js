const SubRepo = require('../repositories/subsRepo')

const getAllSubs = (filters = {}) => {
    return SubRepo.getAllSubs(filters)
}

const getSubById = (id) => {
    return SubRepo.getSubById(id)
}

const addSub = (obj) => {
    return SubRepo.addSub(obj)
}

const updateSub = (id, obj) => {
    return SubRepo.updateMovie(id, obj)
}

const deleteSub = (id) => {
    return SubRepo.deleteSub(id)
}

module.exports = {getAllSubs, getSubById, addSub, updateSub, deleteSub}
