const mongosse = require('mongoose');

const postSchema = mongosse.Schema({
   content : { type : String},
   imagePath : { type : String},
   creator : { type : mongosse.Schema.Types.ObjectId,ref :"user"},
   creatorName : { type: String,ref :"user"},
   creatorEmail : { type: String,ref :"user"},
   creatorState: { type: String,ref :"user"},
   creatorPhone : { type: String,ref :"user"},
});

module.exports = mongosse.model('posts',postSchema);