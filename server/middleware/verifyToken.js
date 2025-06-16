const jwt = require('jsonwebtoken');

require('dotenv/config')

const verifyToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']

    if(!authHeader)
        return res.status(400).json('Token is required')

    const token = authHeader.split(" ")[1];
    try{
       const currentUser = await jwt.verify(token,process.env.JWT_SECRET_KEY)
       req.currentUser = currentUser;
        next()
    }catch(err){
        return res.status(401).json('Invalid Token')
    }
}

module.exports = verifyToken