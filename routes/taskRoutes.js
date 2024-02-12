import { getAllTasks, getSingleTask,createTask,updateTask,deleteTask} from '../controller/taskController.js'
import { authenticatedUser } from '../middleware/authentication.js'


import express from 'express'

const router = express.Router()

router.route('/').get(getAllTasks).post(authenticatedUser, createTask)

router.route('/:id').get(getSingleTask).patch(authenticatedUser, updateTask).delete(authenticatedUser, deleteTask)

export default router