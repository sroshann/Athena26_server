import express from 'express'
// import { createServer, request } from 'http'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './lib/db.connection.js'
import authRouter from './routes/ath.route.js'
import playerRouter from './routes/player.route.js'

const app = express()
// const server = createServer( app )
dotenv.config()
let dbConnected = false

app.use( express.json() )
app.use( cookieParser() )
app.use( cors({

    origin: [

        'https://www.athenatkmce.site',
        'http://localhost:5173'

    ],
    credentials : true

}) )

// DB connection middleware according to vercel
app.use( async ( request, response, next ) => {

    if( !dbConnected ) {

        await connectDB()
        dbConnected = true

    }
    next()

} )

app.use('/authenticate', authRouter)
app.use('/player', playerRouter)

// No need for vercel
// server.listen( process.env.PORT || 5000, () => {

//     // console.log('Server running')
//     // connectDB()

// } )

export default app