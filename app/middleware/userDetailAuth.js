const { json } = require('express/lib/response');
var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function userDetailAuth(req, res, next) {
    let user;
    var token = req.headers['x-access-token'];
    if (!token) return res.status(400).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

        req.user = decoded.user;
        user=decoded.user;               
    });
   
    return user;
}