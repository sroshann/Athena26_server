import mongoose from "mongoose"

const userSchema = new mongoose.Schema(

    {

        email : { type : String, required : true, unique : true },
        fullName : { type : String, required : true, unique : true },
        phoneNumber : { type : Number, required : true, unique : true },
        password : { type : String, required : true, minlength : 6 }

    },
    { timestamps : true }

)

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema)