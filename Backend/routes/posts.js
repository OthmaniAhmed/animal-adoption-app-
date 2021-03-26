const express = require("express");
const router = express.Router();
const Post = require('../models/post');



router.post("/",(req, res) => {
    var post = new Post({
        title : req.body.title,
        content : req.body.content
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message:'Post Added !!',
            postId: createdPost._id
        }) ;
     });
});



router.get('/',(rep, res, next) =>{
   Post.find().then(document =>{
    res.status(200).json({
        message:'post fetched',
        posts:document });
    
    });
});

router.delete("/:id",(rep, res, next)=>{
    Post.deleteOne({_id: rep.params.id}).then(result => {
     
        res.status(200).json({message:'Post deleted'});
    });
});

router.put("/:id",(req,res,next) => {
    const post = new Post({
        _id:req.body.id,
        title: req.body.title ,
        content: req.body.content ,
    });
        Post.updateOne({_id: req.params.id}, post).then(result =>{
           res.status(200).json({message: 'Update successful!!'})
        })
});

router.get("/:id",(req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post){
            res.status(200).json(post);
        } else{
            res.status(404).jason({message: 'Post not found!' });
        }
    })
});

module.exports = router ;