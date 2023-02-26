const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('./config')

exports.premiddleware = () => {
    return (req, res, next) => {
        try{
            const {authorization} = req.headers;
            const user =  jwt.verify(authorization, JWT_SECRET);
            req.body.user = user;
            next();
        }catch(err){
            return res.status(401).send({ data: "Token expired" });
        }
       
    };
  };


  exports.postmiddleware = () => {
    return (req, res, next) => {
        try{
            const token = jwt.sign({ email: req.body.email }, JWT_SECRET, {
                expiresIn: "10s",
              });
              res.status(201).json({ status: "ok", data: token });
        }catch(err){
            return res.status(401).send({ data: "Login failed" });
        }
       
    };
  };
  