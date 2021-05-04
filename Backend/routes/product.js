const express = require("express");
const Product = require('../models/product');
const multer = require("multer")

const router = express.Router();

const MIME_TYPE_MAP ={
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg',
};

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("invalid mime type");
        if(isValid){
            error = null;
        }
        cb(null, "backend/images/products");
    },
    filename: (req, file, cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name +'-'+Date.now()+'.'+ext)
    }
});


router.post("/", multer({storage : storage}).single("image"), (req, res, next)=>{
    const url = req.protocol + '://' + req.get("host");
    var prod = new Product({
        name : req.body.name ,
        price : req.body.price ,
        quantity: req.body.quantity,
        description: req.body.description,
        animalType: req.body.animalType,
        imagePath: url+"/images/products/" + req.file.filename
    });
    prod.save((err, docs)=>{
        if(!err) { 
            res.send(docs); 
        }
        else{console.log('Error in saving the  Product :' + JSON.stringify(err,undefined, 2)) ;}
    });
})


router.get('/',(req,res)=>{
    Product.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in retriving Product')
        }
    })
})

router.delete('/:id',(req,res,err)=>{
    Product.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Deleting the Product')
        }
    })
})

router.put('/:id',(req, res)=>{
    var prod = {
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity, 
        description: req.body.description,
        animalType : req.body.animalType,
    }
    Product.findByIdAndUpdate(req.params.id,{ $set: prod},{new : true},(err, doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Product update')
        }
})
})

module.exports = router ;