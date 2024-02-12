import { StatusCodes } from "http-status-codes"
import User from "../model/User.js"
import NotFoundError from "../errors/not-found.js"
import UnAuthenticatedError from "../errors/unauthenticated.js"
import BadRequestError from "../errors/bad-request.js"

const register = async (req,res) => {
    const user = await User.create({...req.body})

    res.status(StatusCodes.CREATED).json({user})
}

const login = async (req,res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        throw new BadRequestError('Some values were not provided')
    }

    // if user exists
    const user = await User.findOne({email})

    if(!user){
        throw new NotFoundError('No user found')
    }

    // compare passwords

    const passwordIsMatch = await user.comparePasswords(password) 

    if(!passwordIsMatch){
        throw new UnAuthenticatedError('Invalid email or password')
    }

    const tokenUser = await user.getUser()

    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({user : tokenUser, token})
}

export { register, login }