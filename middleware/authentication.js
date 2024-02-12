import UnAuthenticatedError from "../errors/unauthenticated.js"
import jwt from 'jsonwebtoken'

const authenticatedUser = (req, res, next) => {
    const authHeader = req.headers.authorization

    console.log(authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnAuthenticatedError('User not authorized to access this end point')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {
            userId : payload.userId,
            name : payload.name,
            email : payload.email
        }

        next()
    } catch (error) {
        throw new UnAuthenticatedError('Authentication Failed')
    }
}


export { authenticatedUser}