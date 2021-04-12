const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "i_use_this_to_secure_my_token");
    next();
    }catch(error){
        res.status(401).json(
            {message : "Auth failed"}
        );
    }
};