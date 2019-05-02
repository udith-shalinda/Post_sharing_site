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
                message:"User email is already taken"
            })
        });
    })
});

router.post("/login",(req,res,next)=>{
    let fetchUser;
    let errorMessage;

    User.findOne({email : req.body.email})
    .then(user=>{
        if(!user){
            errorMessage = "Email is not correct";
            return res.status(401).json({
                message : "Email is not correct"
            });
        }
        fetchUser = user;
        return bcript.compare(req.body.password,user.password)
    })
    .then(result=>{
        if(!result){
            errorMessage = "Password is incorrect";
            return res.status(401).json({
                message : "Password is incorrect"
            });
        }
        const token = jwt.sign(
            {email:fetchUser.email,
            userId:fetchUser._id },
            "secret_this_should_be_longer",
            {expiresIn:"1h"}
        ); 
        res.status(201).json({
            token :token,
            userId:fetchUser._id
        });
    }).catch(err=>{
        return res.status(401).json({
            message : errorMessage
        });
    });
})

module.exports = router;