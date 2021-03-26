const mongosse = require('mongoose');

const postSchema = mongosse.Schema({

   title : {type:String},
   content : { type:String} 
});

module.exports = mongosse.model('posts',postSchema);