const Member = require('../models/memberModel')

//Get All
const getAllMembers = (filters) => {
    return Member.find(filters)
}

//Get by id
const getMemberById = (id) => {
    return Member.findById(id)
}

//Create
const addMember = (obj) => {
    const memb = new Member(obj)
    return memb.save()
}

//Update
const updateMember = (id, obj) => {
    return Member.findByIdAndUpdate(id, obj)
}

//Delete
const deleteMember = (id) => {
    return Member.findByIdAndDelete(id)
}

module.exports = {getAllMembers, getMemberById, addMember, updateMember, deleteMember}