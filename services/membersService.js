const memberRepo = require('../repositories/membersRepo')

const getAllMembers = (filters = {}) => {
    return memberRepo.getAllMembers(filters)
}

const getMemberById = (id) => {
    return memberRepo.getMemberById(id)
}

const addMember = (obj) => {
    return memberRepo.addMember(obj)
}

const updateMember = (id, obj) => {
    return memberRepo.updateMember(id, obj)
}

const deleteMember = (id) => {
    return memberRepo.deleteMember(id)
}

module.exports = {getAllMembers, getMemberById, addMember, updateMember, deleteMember}