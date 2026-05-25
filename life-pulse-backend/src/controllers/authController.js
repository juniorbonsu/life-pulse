// going to receive a set of name, username, and password
// need to verify that none are empty
//then hash them

const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const signup = async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        return res.status(400).json({message: 'Credential invalid or not provided. Please try again.'})
    }
    
    try{
        
        //else: we have all the information and can actually do something with it
        const hasUser = await prisma.user.findUnique({
            where: {email: email}
        })
        
        if(hasUser){
            return res.status(400).json({message: 'An account with this email already exists. Please try again.'})
        }

        //TODO: hash the password before we store it in the database
        const hashPassword = await bcrypt.hash(password, 10)

        //add this to the database
        
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        })
    } catch (e){
        return res.status(500).json({message: 'Error with this request' + e.message})
    }
    
    
    return res.status(201).json({message: 'Account created successfully'})

}

const login = async (req, res) => {
    const {email, password} = req.body

    //check to see if the username or password was not provided
    if(!email || !password){
        return res.status(400).json({message: 'Credential not provided. Please try again.'})
    }

    try{    
        //else: need to check and see if the username is in the db
        const username = await prisma.user.findUnique({
            where: {email}
        })
        

        if (!username){
            return res.status(404).json({message: 'Invalid username, Please try again.'})
        }

        //username in db, try to match password
        let match = await bcrypt.compare(password, username.password)

        if(!match){
            return res.status(401).json({message: 'Invalid password, Please try again.'})
        }

        const payload = { id: username.id}
        const secretKey = process.env.JWT_SECRET // Keep this confidential
        const options = { expiresIn: '1h' }

        const token = jwt.sign(payload, secretKey, options)
        return res.status(200).json({token})

    } catch(er){
        return res.status(500).json({message: 'Error with this request' + er.message})
    }

}

module.exports = { signup, login }