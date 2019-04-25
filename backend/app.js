const express = require('express');
const List = require('./modles/list');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
//ODjmkgYPiqNhMgTk

mongoose.connect("mongodb+srv://max:ODjmkgYPiqNhMgTk@testone-e21ea.mongodb.net/node-angular?retryWrites=true")
.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader("Access-control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin ,X-Requested-With , Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET ,POST,PATCH,DELETE,OPTIONS"); 
    next();
});

app.post('/home',(req,res,next)=>{
    const list = new List({
        title:req.body.title,
        comment:req.body.comment

    });
    // const list = req.body;
    // console.log(list);
    list.save();
    res.status(201).json({
        message:'element added successfully'
    });
});

app.get('/home',(req,res,next)=>{
    List.find()
    .then((document)=>{
        console.log(document);
        res.status(200).json({
            message:'The list is fetched',
            List:document
        });
    });
});

module.exports = app;