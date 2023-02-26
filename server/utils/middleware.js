const jwt = require("jsonwebtoken");
const JWT_SECRET =
            "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

exports.premiddleware = () => {
    return (req, res, next) => {
        try{
            const { token } = req.body;
                        const user =  jwt.verify(token, JWT_SECRET);
            req.body.user = user;
            console.log(user,'user');
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
  