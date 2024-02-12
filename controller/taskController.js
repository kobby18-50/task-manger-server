import { StatusCodes } from "http-status-codes"
import BadRequestError from '../errors/bad-request.js'
import NotFoundError from '../errors/not-found.js'
import Task from "../model/Task.js"
import { checkDates } from "../utils/checkDates.js"

const getAllTasks = async (req,res) => {
    const tasks = await Task.find({}).sort('-updatedAt')
    res.status(StatusCodes.OK).json({tasks, count : tasks.length})
}

const getSingleTask = async (req,res) => {
    const { id : taskID } = req.params

    const task = await Task.findOne({_id : taskID})

    if(!task){
        throw new NotFoundError('No task found')
    }

    res.status(StatusCodes.OK).json({task})
}

const createTask = async (req,res) => {
    const {name,description, endDate, startDate, assignee} = req.body

    const { userId : assignerId , name : assigner } = req.user

    if(!name || !description || !endDate || !startDate || !assignee){
        throw new BadRequestError('Some values were not provided')
    }

    const taskAlreadyExists = await Task.findOne({name})
    
    if(taskAlreadyExists){
        throw new BadRequestError('Task already exits')
    }

    // check dates
    checkDates(startDate, endDate)

    
    const task = await Task.create({...req.body, assignerId, assigner})
    res.status(StatusCodes.CREATED).json({task})

}

const updateTask = async (req,res) => {
    const { id : taskID } = req.params

    
    
    const task = await Task.findOneAndUpdate({_id : taskID}, req.body, {new:true, runValidators : true})
    
    res.status(StatusCodes.ACCEPTED).json({task})
}

const deleteTask = async (req,res) => {
    const { id : taskID} = req.params

    await Task.deleteOne({_id : taskID})

    res.status(StatusCodes.OK).json({msg : 'Task deleted'})
}

export {
    getAllTasks, getSingleTask,createTask,updateTask,deleteTask
}
