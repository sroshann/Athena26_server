import { PlayerModel } from "../model/player.model.js"

// Get players list
export const getPlayers = async ( request, response ) => {

    try {

        const players = await PlayerModel.find().select('fullName phoneNumber score').sort({ score : -1 })
        if( players.length === 0 ) return response?.status( 500 ).json({ error : 'No players were registered' })
        else return response.status( 200 ).json({ players })

    } catch ( error ) { return response?.status( 500 ).json({ error : 'Error on getting players list' }) }

}

// Add participents
export const addPlayerCtrl = async ( request, response ) => {

    try {

        const { fullName, phoneNumber, score } = request?.body
        const player = await PlayerModel.findOne({ phoneNumber })
        if( player && player?.phoneNumber == phoneNumber ) 
            return response.status( 500 ).json({ error : "Phone number is already taken" })

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
            { $inc : { score : parseInt( scoreUpdt ) } },
            { new : true }

        )

        if( !player ) return response?.status( 500 ).json({ error : "Could'nt update score" })
        return response?.status( 200 ).json({ message : 'Score updated', updtdScore : player?.score })

    } catch ( error ) { return response?.status( 500 ).json({ error : 'Error on updating score' }) }

}   

// Delete player
export const dltPlayerCtrl = async ( request, response ) => {

    try {

        const { _id } = request?.body
        const dlt = await PlayerModel.findByIdAndDelete( _id )
        if( !dlt ) return response?.status( 200 ).json({ error : "Could'nt delete player" })
        return response?.status( 200 ).json({ message : 'Player deleted' })

    } catch ( error ) { return response?.status( 500 ).json({ error : 'Error on deleting player' }) }

}