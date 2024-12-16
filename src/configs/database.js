const mongoose = require('mongoose');

const connectDB = async () => await mongoose.connect("mongodb+srv://devtauhid:Tauhid123@cluster0.2syhf.mongodb.net/jamaatTimingApp?retryWrites=true&w=majority&appName=Cluster0")

module.exports = connectDB;