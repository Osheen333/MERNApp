require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT || 8000;
module.exports= {
    JWT_SECRET,
    port
}