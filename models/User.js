const { model, Schema } = require('mongoose')
const { hashSync, compare, compareSync } = require('bcryptjs')
const passport = require('passport')
const { sign } = require('jsonwebtoken')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: 'First Name is required'
    },
    lastName: {
        type: String,
        required: 'Last Name is required'
    },
    email: {
        type: String,
        required: 'Email is Required'
    },
    password: {
        type: String,
        required: 'Password is Required'
    }

}, { timestamps: true })

// userSchema.pre('save', function(next){
//     if(!this.isModified('password')) return next()
//     this.password = hashSync(this.password, 12)
//     next()
// })

userSchema.methods.hassPassword = async function(password){
    console.log(this.password)
    console.log(password)
    this.password = await hashSync(password, 12)
}

userSchema.methods.checkPassword = async function(password){
    return await compare(password, this.password)
}

userSchema.set('toJSON', {
    transform: (doc, { __v, password, ...rest}) => rest
})

userSchema.methods.generateResetPasswordLink = function generateResetPasswordLink(){
return `http://localhost:3000/reset_password/${this.generateResetPasswordToken()}`
}

userSchema.methods.generateResetPasswordToken = function generateResetPasswordToken(){
    return sign({
        _id: this._id
    }, process.env.JWT_SECRET, { expiresIn: '1h'})
}

module.exports = model('User', userSchema)