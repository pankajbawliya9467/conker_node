const mongoose = require('mongoose');

var  CategorySchema = mongoose.Schema({
    name: String,
    image: String,
}, {
    timestamps: true
});
module.exports = mongoose.model('category', CategorySchema);