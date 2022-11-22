const mongoose = require('mongoose');

var  IntrestSchema = mongoose.Schema({
    name: String,
    image: String,
}, {
    timestamps: true
});
module.exports = mongoose.model('intrest', IntrestSchema);