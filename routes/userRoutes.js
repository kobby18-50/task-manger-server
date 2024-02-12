import { getAllUsers} from '../controller/userController.js'
import express from 'express'

const router = express.Router()

router.route('/').get(getAllUsers)

export default router