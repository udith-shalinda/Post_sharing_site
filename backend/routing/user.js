const express = require('express');
const User = require('../modles/user');
const bcript = require('bcrypt');


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

module.exports = router;