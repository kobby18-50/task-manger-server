import { StatusCodes } from "http-status-codes"
import User from "../model/User.js"

const getAllUsers = async(req,res) => {
    const users = await User.find({}).sort('-updatedAt').select('-password')

    res.status(StatusCodes.OK).json({users, count : users.length})
}

export { getAllUsers}