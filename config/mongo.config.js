const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config()

module.exports = { 
    mongo_url: process.env.DBHost,
    mongoose: mongoose
}