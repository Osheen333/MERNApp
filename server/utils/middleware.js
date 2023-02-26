const jwt = require("jsonwebtoken");
module.exports = fn => {
    return (req, res, next) => {
        try{
            const { token } = req.body;
            const JWT_SECRET =
            "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
            const user =  jwt.verify(token, JWT_SECRET);
            req.body.user = user;
            console.log(user,'user');
            next();
        }catch(err){
            return res.status(401).send({ data: "Token expired" });
        }
       
    };
  };
  