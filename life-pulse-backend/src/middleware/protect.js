const jwt = require('jsonwebtoken')
require('dotenv').config()

const protect = async (req, res, next) => {
    /*
        user could send no token at all
        header can be empty
        message can be malformed
    */
    
    if(!req.headers.authorization) {
        return res.status(401).json({message: 'Header not provided.'})
    }
    //not empty, now we check what is within the message
    const header = req.headers.authorization.split(" ")

    if (header.length != 2){
        return res.status(401).json({message: 'Header contains incorrect format'})
    }

    const token = header[1]
    const secretKey = process.env.JWT_SECRET // Keep this confidential


    try{
        const result = jwt.verify(token, secretKey)

        req.user = result

        next()

    } catch (er){
        return res.status(401).json({message: "Error with token" + er.message})
    }

}

module.exports =  protect