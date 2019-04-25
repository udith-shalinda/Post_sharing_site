const express = require('express');
const List = require('./modles/list');

const app = express();

app.use((req,res,next)=>{
    res.setHeader("Access-control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin ,X-Requested-With , Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET ,POST,PATCH,DELETE,OPTIONS"); 
    next();
});

app.post('/home',(req,res,next)=>{
    // console.log(req.body.title);
    res.status(201).json({
        message:'element added successfully'
    });
});

app.use('/home',(req,res,next)=>{
    const list=[{
        id:'sfsfsfsf',
        title:'test one',
        comment:'this is first test'
    },{
        id:'ssssssssssss',
        title:"test two",
        comment:'this is second test'
    }];
    res.status(200).json({
        message:'The list is fetched',
        List:list
    });
});

module.exports = app;