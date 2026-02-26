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

            if( user?.phoneNumber === phoneNumber ) return response.status( 400 ).json({ error : "Phone number is already taken" })
            else if( user?.email === email ) return response.status( 400 ).json({ error : "Email is already taken" })

        }

        const salt = await bcrypt.genSalt( 10 )
        const hashedPass = bcrypt.hashSync( password, salt )

        const newUser = new UserModel({ email, phoneNumber, password : hashedPass, fullName })
        await newUser.save()
        generateToken( newUser?._id, response ) // Generating token
        return response.status( 200 ).json({ message : 'User created' })

    } catch ( error ) { return response.status( 200 ).json({ error : 'Error occured on sign up' }) }

}