const express = require('express');
const bcript = require('bcrypt');
const User = require('../modles/user');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post("/signup",(req,res,next)=>{
    bcript.hash(req.body.password,10)
    .then(hash =>{
        const user = new User({
            email:req.body.email,
            password:hash
        });
        user.save().then(result=>{
            res.status(201).json({
                message:"Created a new user",
                result:result
            })
        }).catch(err=>{
            res.status(500).json({
                error:err
            })
        });
    })
});

router.post("/login",(req,res,next)=>{
    let fetchUser;
    User.findOne({email : req.body.email})
    .then(user=>{
        if(!user){
            return res.status(401).json({
                message : "Auth failed"
            });
        }
        fetchUser = user;
        return bcript.compare(req.body.password,user.password)
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({
                message : "Auth failed"
            });
        }
        const token = jwt.sign(
            {email:fetchUser.email,
            userId:fetchUser._id },
            "this_line_should_be_long",
            {expiresIn:"1h"}
        );
        res.status(201).json({
            token :token
        });
    }).catch(err=>{
        return res.status(401).json({
            message : "Auth failed"
        });
    });
})

module.exports = router;