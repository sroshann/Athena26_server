import express from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './lib/db.connection.js'
import authRouter from './routes/ath.route.js'
import playerRouter from './routes/player.route.js'

const app = express()
const server = createServer( app )
dotenv.config()

app.use( express.json() )
app.use( cookieParser() )
app.use( cors({

    origin : 'https://athenatkmce.site' || 'http://localhost:5173',
    credentials : true

}) )

app.use('/authenticate', authRouter)
app.use('/player', playerRouter)

server.listen( process.env.PORT || 5000, () => {

    // console.log('Server running')
    connectDB()

} )

