import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes'

// Middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

// Routes
app.use('/api', routes.authRouter)
app.use('/api', routes.userRouter)
app.use('/api', routes.categoryRouter)
app.use('/api', routes.blogRouter)

// Database
import './config/database'

// Server listenning
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server is running on port', PORT))

// MERN STACK + TYPESCRIPT + REDUX | BLOG TUTORIAL | BE - GET BLOGS BY CATEGORY #30 | 8:02 / 25:47
