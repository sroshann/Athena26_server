import bcrypt from "bcryptjs"
import { UserModel } from "../model/user.model.js"
import { generateToken } from "../lib/token.js"

export const signupCtrl = async ( request, response ) => {

    try {

        const { email, phoneNumber, password, fullName } = request?.body

        // Checking whether the user is already exist
        const user = await UserModel.findOne({

            $or : [ { email }, { phoneNumber } ]

        })
        if( user ) {

            if( user?.phoneNumber === phoneNumber ) return response.status( 401 ).json({ error : "Phone number is already taken" })
            else if( user?.email === email ) return response.status( 401 ).json({ error : "Email is already taken" })

        }

        const salt = await bcrypt.genSalt( 10 )
        const hashedPass = bcrypt.hashSync( password, salt )

        const newUser = new UserModel({ email, phoneNumber, password : hashedPass, fullName })
        await newUser.save()
        const token = generateToken( newUser?._id, response ) // Generating token
        let { updatedAt, createdAt, __v, ...rest } = newUser
        rest = { ...rest, password : null, token }
        return response.status( 200 ).json({ message : 'User created', user : rest })

    } catch ( error ) { return response.status( 500 ).json({ error : 'Error occured on sign up' }) }

}

export const loginCtrl = async ( request, response ) => {

    try {

        const { email, password } = request?.body
        const user = await UserModel.findOne({ email })
        if( user ) {

            const compare = bcrypt.compareSync( password, user?.password )
            if( compare ) {

                const token = generateToken( user?._id, response )
                let { updatedAt, createdAt, __v, password, ...rest } = user?.toObject()
                rest = { ...rest, token }
                return response?.status( 200 ).json({ message : 'User authenticated', user : rest })

            } else return response?.status( 404 ).json({ error : 'Invalid credential' })

        } else return response?.status( 404 ).json({ error : 'Invalid credential' })

    } catch ( error ) { return response.status( 500 ).json({ error : 'Error on login' }) }

}

export const logOutCtrl = async ( request, response ) => {

    try { return response.status( 200 ).json({ message : 'Loged out successfully' }) }
    catch ( error ) { return response?.status( 500 ).json({ error : 'Error on logout' }) }

}