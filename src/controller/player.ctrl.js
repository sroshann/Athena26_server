import { PlayerModel } from "../model/player.model.js"

// Add participents
export const addPlayerCtrl = async ( request, response ) => {

    try {

        const { fullName, phoneNumber, score } = request?.body
        const player = await PlayerModel.findOne({ phoneNumber })
        if( player && player?.phoneNumber === phoneNumber ) 
            return response.status( 400 ).json({ error : "Phone number is already taken" })

        const newPlayer = new PlayerModel({ fullName, phoneNumber, score })
        await newPlayer.save()
        const { __v, ...rest } = newPlayer.toObject()
        return response.status( 200 ).json({ message : 'Player added', player : rest })

    } catch ( error ) { return response.status( 500 ).json({ error : 'Error on adding participants' }) }

}

// Update score
export const updtScoreCtrl = async ( request, response ) => {

    try {

        const { _id, scoreUpdt } = request?.body
        const player = await PlayerModel.findByIdAndUpdate(

            _id,
            { $inc : { score : scoreUpdt } },
            { new : true }

        )

        if( !player ) return response?.status( 500 ).json({ error : "Could'nt update score" })
        return response?.status( 200 ).json({ message : 'Score updated', updtdScore : player?.score })

    } catch ( error ) { return response?.status( 500 ).json({ error : 'Error on updating score' }) }

}   