const mongosse = require('mongoose');

const postSchema = mongosse.Schema({

   title : { type: String},
   content : { type : String},
   imagePath : { type : String},
   creator : { type : mongosse.Schema.Types.ObjectId,ref :"user"}

});

module.exports = mongosse.model('posts',postSchema);