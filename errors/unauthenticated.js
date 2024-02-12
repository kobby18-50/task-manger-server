import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error.js";

class UnAuthenticatedError extends CustomError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnAuthenticatedError