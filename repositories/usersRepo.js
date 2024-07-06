const User = require('../models/userModel');

// Get All
const getAllUsers = (filters) => {
    return User.find(filters);
}

// Get by id
const getUserById = (id) => {
    return User.findById(id);
}

// Create
const addUser = (obj) => {
    const user = new User(obj); 
    return user.save();
}

// Update
const updateUser = (id, obj) => {
    return User.findByIdAndUpdate(id, obj);
}

// Delete
const deleteUser = (id) => {
    return User.findByIdAndDelete(id);
}

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
