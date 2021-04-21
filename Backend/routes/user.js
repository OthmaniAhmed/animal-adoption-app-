const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require('../models/user');
const user = require("../models/user");

const router = express.Router();

router.post("/signup",(req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({         
            email : req.body.email,
            password : hash,
            name : req.body.name,
            phoneNumber :req.body.phoneNumber,
            state : req.body.state
        });
        user.save()
        .then(result =>{
                res.status(201).json({
                    message:"User created",
                    result : result
                });
        })
        .catch(err =>{
            res.status(500).json({
                    message : "This Email is invalid !"
            });
        })
    });
    
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user){
            return res.status(401).jason({
                message : "Auth Failed"
            });
        }
        fetchedUser = user;
       return bcrypt.compare(req.body.password, user.password)
    })

    .then(result => {
        if(!result){
            return res.status(401).jason({
                message : "Auth Failed"
            });
        }
        const token = jwt.sign(
        {
            email: fetchedUser.email, 
            userId: fetchedUser._id, 
            userName:fetchedUser.name,
            userEmail:fetchedUser.email,
            userState:fetchedUser.state, 
            userPhone:fetchedUser.phoneNumber 
        },
        'i_use_this_to_secure_my_token',
        {expiresIn: '1h'});
        res.status(200).json({
            token : token,
            expiresIn : 3600,
            userId : fetchedUser._id,
            userName:fetchedUser.name, 
        });
    })
    .catch(err =>{
        return res.status(401).json({
            message: "Invalid authentication credentials !!"
        });
    })
});



module.exports = router ;