const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb+srv://ofir2508:ofir2508@cluster0.ewgbfik.mongodb.net/FinalProject?retryWrites=true&w=majority', {
      writeConcern: { w: 'majority' } 
    })
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log('Connection error:', error));
};

module.exports = connectDB;
