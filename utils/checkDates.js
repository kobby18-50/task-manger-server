import BadRequestError from "../errors/bad-request.js"

const checkDates = (startDate, endDate) => {
    if(endDate < startDate || startDate === endDate){
        throw new BadRequestError('Check values for start date and end date')
    }
}


export {checkDates}