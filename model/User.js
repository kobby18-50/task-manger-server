
import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        minlength : 10
    },

    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : [true, 'Email already exists'],
        validate : {
            validator : validator.isEmail,
            message : 'Please provide a valid email'
        }
    },

    password : {
        type : String,
        required : [true, 'Password is required'],
        minlength : [8, 'Minlength for password is 8 characters']
    }
}, {timestamps : true})

UserSchema.pre('save', async function(){
    console.log(this.modifiedPaths())

    if(!this.isModified('password')) return

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


UserSchema.methods.createJWT = function(){
    const token = jwt.sign({userId : this._id, name : this.name, email : this.email}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_LIFETIME})
    return token
}

UserSchema.methods.comparePasswords = async function (candidatePassword){
    const isMatch = bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

UserSchema.methods.getUser = function(){
    return { name : this.name, email : this.email}
}

export default mongoose.model('User', UserSchema)