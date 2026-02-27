import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({

    phoneNumber : { type : Number, required : true, unique : true, minlength : 10 },
    fullName : { type : String, required : true },
    score : { type : Number, required : true, default : 0 }

})

export const PlayerModel = mongoose.models.Player || mongoose.model('Player', playerSchema)