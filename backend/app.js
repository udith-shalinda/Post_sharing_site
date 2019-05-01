const express = require('express');
const List = require('./modles/list');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");

const postRoutes = require("./routing/post");
const userRoutes = require("./routing/user");

const app = express();
//ODjmkgYPiqNhMgTk

mongoose.connect("mongodb+srv://max:ODjmkgYPiqNhMgTk@testone-e21ea.mongodb.net/node-angular" ,{useNewUrlParser:true})
.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/image',express.static(path.join("backend/image")));

app.use((req,res,next)=>{
    res.setHeader("Access-control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin ,X-Requested-With , Content-Type,Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET ,POST,PUT,PATCH,DELETE,OPTIONS"); 
    next();
});





app.use("/home",postRoutes);
app.use("/user",userRoutes);



module.exports = app;
