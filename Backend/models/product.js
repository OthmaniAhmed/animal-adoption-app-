const mongosse = require('mongoose');

const productSchema = mongosse.Schema({
    name : {type : String},
    price : {type : String},
    quantity : {type : String}, 
    description: {type : String},
    animalType : {type : String},
    imagePath: {type : String}
})

module.exports = mongosse.model('product',productSchema)