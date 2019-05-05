const express = require('express');
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ProfileInfo = require("../modles/profile");

const router = express.Router();

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



router.post("/save",checkAuth, multer({storage:storage}).single("image"),(req,res,next)=>{
    const url = req.protocol + "://"+req.get('host');
    const userInfo=new ProfileInfo({
        name:req.body.name,
        email:req.userData.email,
        address:req.body.address,
        imagePath: imagePath = url + "/image/" + req.file.filename,
        creater:req.userData.userId,
        mobile:req.body.mobile,
        university:req.body.university
    });
    userInfo.save()
    .then(result=>{
        res.status(200).json({
            message:'successfully saved',
            result:result
        });
    });
})

router.get("/getDetails",checkAuth,(req,res,next)=>{
    ProfileInfo.findOne({creater:req.userData.userId})
    .then(result=>{
       if(result){
           res.status(200).json({
               message:"Data have been passed",
               result:result
           });
       } 
    });
})

router.get("/getDetails/:creater",checkAuth,(req,res,next)=>{
    ProfileInfo.findOne({creater:req.params.creater})
    .then(result=>{
       if(result){
           res.status(200).json({
               message:"Data have been passed",
               result:result
           });
       } 
    });
});

router.put("/update",checkAuth,multer({storage:storage}).single("image"),(req,res,next)=>{
    let imagePath    = req.body.image;
    if(req.file){
        const url = req.protocol + "://"+req.get('host');
        imagePath = url + "/image/" + req.file.filename;
    }
    const newprofileinfo = new ProfileInfo({
        _id:req.body.id,
        name:req.body.name,
        email:req.userData.email,
        address:req.body.address,
        imagePath: imagePath,
        creater:req.userData.userId,
        mobile:req.body.mobile,
        university:req.body.university
    });
    ProfileInfo.updateOne({_id:req.body.id},newprofileinfo)
    .then(result=>{
        if(result.nModified > 0){
            res.status(200).json({
                message:"Successfully profile details Updated!"
            });
        }else{
            res.status(401).json({
                message:"Update failed"
            });
        }
    });
});

module.exports = router;
