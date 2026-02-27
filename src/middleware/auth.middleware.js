import jwt from 'jsonwebtoken'
import { UserModel } from '../model/user.model.js'

// Protecting user function routes on checking the presence of token
export const protectPlyrRoutes = async ( request, response, next ) => {

    try {

        const { token } = request.body
        if( token ) {

            const decode = jwt.verify( token, process.env.JWT_SECRET )
            if( decode ) {

                const { userId } = decode
                const user = await UserModel.findById( userId ).select('-password -__v -updatedAt')
                console.log( user )
                request.user = user
                next() 

            }
            else return response.status( 401 ).json({ error : 'Invalid token' })

        } else return response.status( 401 ).json({ error : 'No token provided' })

    } catch( error ) { return response.status( 500 ).json({ error : 'Error on finding token' }) }

}