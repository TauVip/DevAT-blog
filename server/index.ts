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

// Database
import './config/database'

// Server listenning
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server is running on port', PORT))

// MERN STACK + TYPESCRIPT + REDUX | BLOG TUTORIAL | MIDDLEWARE UPDATE_USER #19 | 12:23 / 32:14
