const { loginSchema, registerSchema } = require('../validations/joi')
const Users = require('../models/User')
const jwt = require('jsonwebtoken')
const { sendResetPasswordEmail } = require('../utils/nodemailer')
const passport = require('passport')
const getToken = async payload => {
    return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'})
}

exports.login = async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
        const user = await Users.findOne({ email: req.body.email })
        if(!user) return res.status(400).json({ Error: 'No User with that Account' })
        const isMatched = await user.checkPassword(req.body.password)
        if(!isMatched) return res.status(404).json({ Error: 'Email/Password Incorrect' })
        const payload = {
            userId: user._id
        }
        const token = `Bearer ${await getToken(payload)}`
        return res.status(200).json({ token })
    }catch(e){
        if(e.isJoi){
            return res.status(400).json({ [e.details[0].context.label]: e.details[0].message })
        }
        next(e)
    }
}


exports.register = async (req, res, next) => {
    try {
        await registerSchema.validateAsync(req.body, { abortEarly: false })
        const userExists = await Users.exists({ email: req.body.email })
        if(userExists) return res.status(400).json({ Error: 'this is Email already in use'})
        const newUser = await new Users(req.body)
        await newUser.hassPassword(req.body.password)
        const user = await newUser.save()
        const payload = {
            userId: user._id
        }
        const token = `Bearer ${await getToken(payload)}`
        return res.status(200).json({ token })
    }catch(e){
        if(e.isJoi){
            return res.status(400).json({ [e.details[0].context.label]: e.details[0].message })
        }
        next(e)
    }
}

exports.reset_password_request = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if(!user) return res.status(400).json({ Error: 'Not Found this Email'})
        sendResetPasswordEmail(user)
        return res.status(200).json({})
    }catch(e){
        next(e)
    }
}

exports.reset_password = (req, res, next) => {
   try{
        const { password, token } = req.body
        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) return res.status(401).json({ Error: 'Invalid Token'})
        await Users.findOne({ _id: payload._id }).then( async user => {
            if(err) return res.status(404).json({ Error: 'Something went wrong'})
            await user.hassPassword(password)
            await user.save()
            .then(user => {
                    return res.status(200).json({  })
                })
        })
    })
   }catch(e){
        next(e)
   }
}

exports.validate_token = (req, res, next) => {
    try {
        jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
            if(err) return res.status(401).json({ Error: 'invalid token'})
            return res.json({ })
        })
    }catch(e){
        next(e)
    }
}

exports.profile = async (req, res, next) => {
    try {
        const user = await Users.findById(req.user._id)
        return res.status(200).json( user )
    }catch(e){
        next(e)
    }
}