// Importing the 'users' database model
const { users } = require('../db/database');
const jwt = require('jsonwebtoken');

const detailsMiddleware = async (req,res,next) => {
    // Get the token from the cookies
    const token = req.cookies.token;
    // Checking if the token exists
    if(!token){
        return res.status(401).json({
            message : "The token might have expired or the user is unauthorized"
        })
    }
    
    // Verify if the token is still valid and a user in the database has that token
    const userId = jwt.verify(token,process.env.JWT_SECRET);
    const user = await users.findById(userId);
    if(!user){
        return res.status(401).json({
            message : "The token might have expired or the user is unauthorized"
        })
    };
    req.user = user;
    next();
};

module.exports = detailsMiddleware;