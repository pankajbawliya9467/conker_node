const mongoose = require('mongoose');

var  BannerSchema = mongoose.Schema({
    name: String,
    image: String,
}, {
    timestamps: true
});
module.exports = mongoose.model('banner', BannerSchema);