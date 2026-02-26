import jwt from 'jsonwebtoken'

export const generateToken = ( userId, response ) => {

    const token = jwt.sign( { userId }, process.env.JWT_SECRET, { expiresIn : '1d' } )
    response.cookie('Token', token, {

        maxAge : 1 * 24 * 60 * 60 * 1000, // Converting 1 day into milliseconds
        httpOnly : true,
        sameSite : 'strict',
        secure : process.env.NODE_ENV !== 'development'

    })

}