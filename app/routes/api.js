const auth = require('./../middleware/auth');
var app = require('express');
const router = app.Router();

//Controllers require
const user = require('../controllers/api/user');
const home = require('../controllers/api/home');

const catchErr = fn =>(req,res, next)=>
    Promise.resolve(fn(req,res,next)).catch(next);


//Auth
    router.post("/signup", catchErr(user.signup));
    router.post("/verify", catchErr(user.verify));
    router.post("/updateUser",auth, catchErr(user.updateUser));
    router.get("/userInfo",auth, catchErr(user.userInfo));
    router.post("/addPlayerId",auth, catchErr(user.addPlayerId));
    

 

module.exports = router;
