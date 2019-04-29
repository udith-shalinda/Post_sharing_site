const express = require('express');
const List = require('./modles/list');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");

const app = express();
//ODjmkgYPiqNhMgTk

mongoose.connect("mongodb+srv://max:ODjmkgYPiqNhMgTk@testone-e21ea.mongodb.net/node-angular?retryWrites=true" ,{useNewUrlParser:true})
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
    res.setHeader("Access-Control-Allow-Headers","Origin ,X-Requested-With , Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET ,POST,PUT,PATCH,DELETE,OPTIONS"); 
    next();
});


const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
}; 

const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mine type");
        if(isValid){
            error = null;
        }
        cb(error,"backend/image");
    },
    filename:(req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-' + Date.now() + '.'+ext);
    }
});



app.post('/home', multer({storage:storage}).single("image") ,(req,res,next)=>{
    const url = req.protocol + "://"+req.get('host');
    const list = new List({
        title:req.body.title, 
        comment:req.body.comment,
         imagePath: url + "/image/" + req.file.filename
        });
    // const list = req.body;
    // console.log(list);
    list.save()
    .then(result=>{
        res.status(201).json({
            message:'element added successfully',
            list:{
                ...result,
                id:result._id
            }
        });
    });
});


app.put('/home/:id',(req,res,next)=>{
    const post = new List({
        _id: req.body.id,
        title:req.body.title,
        comment: req.body.comment,
        imagePath:req.body.imagePath
    });
    List.updateOne({ _id : req.params.id},post).then(result=>{
        console.log(result);
        res.status(200).json({massage:'Updated successfully'});
    });
});


app.get('/home',(req,res,next)=>{
    List.find()
    .then((document)=>{
        //console.log(document);
        res.status(200).json({
            message:'The list is fetched',
            List:document
        });
    });
});

app.get('/home/:id',(req,res,next)=>{
    List.findById(req.params.id)
    .then(post=>{
       if(post){
            res.status(200).json(post);
       }else{
            res.status(404).json({messsage:'post is not found'});
       }
    });
})

app.delete('/home/:id',(req,res,next)=>{
    console.log(req.params.id);
    List.deleteOne({_id:req.params.id}).then((result)=>{
        console.log(result);
        res.status(200).json({massage:'Post deleted'});
    });
});



module.exports = app;
