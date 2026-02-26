import express from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './lib/db.connection.js'

const app = express()
const server = createServer( app )
dotenv.config()

app.use( express.json() )
app.use( cookieParser() )
app.use( cors({

    origin : 'http://localhost:5173' || 'https://athenatkmce.site',
    credentials : true

}) )

server.listen( process.env.PORT || 5000, () => {

    console.log('Server running')
    connectDB()

} )

