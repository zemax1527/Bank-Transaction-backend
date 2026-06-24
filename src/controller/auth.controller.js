const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const { sendRegistrationEmail } = require('../services/email.service')

 async function userRegisterController(req, res) {
    const { name, email, password } = req.body
    
    const isUserExist = await userModel.findOne({
        email:email
    })

    if(isUserExist){
        res.status(422).json({
            message : 'Email already exist',
            status : 'failed'
        })
    }

    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign({userId : user._id}, process.env.JWT_KEY , {expiresIn : '3d'})
    res.cookie('token', token)

    res.status(201).json({
        message : 'user created successfully',
        Id : user._id,
        name : user.name,
        email : user.email,

    })

    await sendRegistrationEmail(user.email, user.name)
}

async function userLoginController(req, res) {
    const { email , password } = req.body

    const user = await userModel.findOne({ email }).select("+password")
    if(!user){
        res.status(401).json({
            message : 'user not found !'
        })
    }
    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        res.status(401).json({
            message : ' Password is invalid '
        })
    }
     
    const token = jwt.sign({userId : user._id}, process.env.JWT_KEY, {expiresIn : '3d'})

    res.status(200).json({
        message : 'user logged in successfully ',
        user : user.email
    })

}

module.exports = {
    userRegisterController , userLoginController
}