import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'

// middleware 
import notFoundMiddleWare from './middleware/not-found.js'
import errorHandlerMiddleWare from './middleware/error-handler.js'
import morgan from 'morgan'
import cors from 'cors'

import 'express-async-errors'

// routes
import taskRouter from './routes/taskRoutes.js'
import authRouter from './routes/authRoutes.js'



dotenv.config()

const app = express()

// express.json

app.use(express.json())

app.use(morgan('tiny'))

app.use(cors())

// routes
app.get('/', (req,res) => {
    res.send('welcome')
})

// task router
app.use('/api/v1/task', taskRouter)

// auth router
app.use('/api/v1/auth', authRouter)

// middlware
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)


const port = process.env.PORT || 5000


const start = async () => {

    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
    
            console.log(`Server listening on port ${port}`)
        })
        
    } catch (error) {
        console.log(error)
    }

}

start()