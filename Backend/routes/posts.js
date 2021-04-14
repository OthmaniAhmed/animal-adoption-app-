const express = require("express");
const multer = require('multer');
const Post = require('../models/post');
const checkAuth = require('../Middleware/ckeak-auth')

const router = express.Router();

const MIME_TYPE_Map = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg',

};



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_Map[file.mimetype];
        let error = new Error("Invalid mine type");
        if(isValid){
            error = null;
        }
        cb(error, "backend/images");
    },
    filename : (req,  file,cb) =>{
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_Map[file.mimetype]
        cb(null, name + "-"+ Date.now() +"."+ext);

    }
});




router.post("/",checkAuth, multer({storage : storage}).single("image") ,(req, res) => {
    const url = req.protocol + '://' + req.get('host');
    var post = new Post({
        title : req.body.title,
        content : req.body.content,
        imagePath : url + "/images/" + req.file.filename,
        creator : req.userData.userId
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message:'Post Added !!',
            post: {
              id:  createdPost._id,
              title : createdPost.title,
              content : createdPost.content,
              imagePath : createdPost.imagePath,
              creator : createdPost.userId
            }

        }) ;
     });
});





router.delete("/:id",checkAuth,(req, res, next)=>{
    Post.deleteOne({_id: req.params.id,creator: req.userData.userId}).then(result => {
        console.log(result)
        if(result.n > 0){
        res.status(200).json({message:'Post deleted'});
    }else{
        res.status(401).json({message:"not authorized"})
    }
    });
});






router.put("/:id",checkAuth, multer({storage : storage}).single("image") ,(req,res,next) => {
   let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + "/images/" + req.file.filename;
    };
    
    const post = new Post({
        _id:req.body.id,
        title: req.body.title ,
        content: req.body.content ,
        imagePath: imagePath
    });
        Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result =>{
            if (result.nModified > 0){
                res.status(200).json({message: 'Update successful!!'})   
            }else{
                res.status(401).json({message: 'Not authorized!'})
            }
           
        })
});




router.get('/',(req, res, next) =>{
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts ;
   if(pageSize && currentPage){
       postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
   } 
   postQuery.find().then(document =>{
       fetchedPosts = document;
    return Post.countDocuments();
    }).then(count => {
        res.status(200).json({
            message:'post fetched',
            posts: fetchedPosts,
            maxPosts : count 
        });
        
    });
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