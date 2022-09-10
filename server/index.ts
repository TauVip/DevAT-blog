import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

// Middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

// Socket.io
const http = createServer(app)
export const io = new Server(http)
io.on('connection', (socket: Socket) => SocketServer(socket))

// Routes
app.use('/api', routes)

// Database
import './config/database'
import { SocketServer } from './config/socket'

// Server listenning
const PORT = process.env.PORT || 5000
http.listen(PORT, () => console.log('Server is running on port', PORT))

// BLOG APP #50 SEARCH BLOGS | MERN STACK + TYPESCRIPT + REDUX | 21:29 / 25:47
