const auth = require('./../middleware/auth');
var app = require('express');
const router = app.Router();

//Constrollers require
const category = require('../controllers/admin/category.js');
const banner = require('../controllers/admin/banner.js');
const intrest = require('../controllers/admin/intrest.js');
const amazone = require('../controllers/admin/s3bucket.js');


const user = require('../controllers/admin/user');

//Global try catch
const catchErr = fn =>(req,res, next)=>
    Promise.resolve(fn(req,res,next)).catch(next);


//Admin 
    // router.post("/admin/signup", catchErr(admin.signup));
    // router.post("/admin/login", catchErr(admin.login));

//user
    router.get("/user/view", catchErr(user.getUser));


//Category  
    router.post("/category/add", catchErr(category.addCategory));
    router.get("/category/view",catchErr(category.viewCategory));
    router.post("/category/edit", catchErr(category.editCategory));
    router.delete("/category/delete/:id", catchErr(category.deleteCategory));
    router.post("/category/update", catchErr(category.updateCategory));

 //banner  
    router.post("/banner/add", catchErr(banner.addBanner));
    router.get("/banner/view", catchErr(banner.viewBanner));
    router.post("/banner/edit", catchErr(banner.editBanner));
    router.delete("/banner/delete/:id", catchErr(banner.deleteBanner));
    router.post("/banner/update", catchErr(banner.updateBanner));

//intrest   
    router.post("/intrest/add", catchErr(intrest.addIntrest));
    router.get("/intrest/view", catchErr(intrest.viewIntrest));
    router.post("/intrest/edit", catchErr(intrest.editIntrest));
    router.delete("/intrest/delete/:id", catchErr(intrest.deleteIntrest));
    router.post("/intrest/update", catchErr(intrest.updateIntrest));

// s3 bucket file upload 
router.post("/s3file", catchErr(amazone.uploads3));



module.exports = router;