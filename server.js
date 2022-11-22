const {mongo_url, mongoose} = require('./config/mongo.config');
const express = require('express');
const bodyParser = require('body-parser');
var http = require("http");
const cors = require("cors");
require('dotenv').config()

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: '50mb',extended: true }))

//Custom Port
const Port=process.env.PORT;

// Connecting to the Mongo database
mongoose.connect(mongo_url, {
    useNewUrlParser: true
}).then(() => {
    console.log("mongoose Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



app.use(cors());

//route
var apiRouter=require('./app/routes/api.js'); 
var adminRouter=require('./app/routes/admin.js'); 

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Conker World."});
});

//Images path
app.use('/images',express.static(__dirname + '/images'));

// Require  routes
app.use('/api/',apiRouter);
app.use('/api/admin/',adminRouter);

//Error handlers
app.use(function(err, req, res, next) {
    console.log(err)
    res.status(500).send({message: 'Something went wrong'});
})

//404  
app.use(function(req, res, next) {
    res.status(404).send({message: 'Sorry,Page not found'});
});

// listen for requests
app.listen(Port, () => {
    console.log("Server is listening on port "+Port);
});