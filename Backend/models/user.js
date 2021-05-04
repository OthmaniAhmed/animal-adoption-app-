const mongosse = require('mongoose');
const uniqueValidateur = require("mongoose-unique-validator")

const userSchema = mongosse.Schema({

  email : {type: String, unique: true },
  password :{type: String},
  name : {type: String},
  phoneNumber : {type: String},
  state : {type: String},
  role : {type: String}

});

userSchema.plugin(uniqueValidateur);

module.exports = mongosse.model('user',userSchema);