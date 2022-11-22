var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function auth(req, res, next) {

    var token = req.headers['x-access-token'];
    if (!token) return res.status(400).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

        req.user = decoded;
        // console.log(req.user)
        next();
    });
}