import mongoose  from "mongoose";



const UserSchema=new mongoose.Schema({

    "username" : {
        type : String,
        required : true,
        unique : true
    },
    "password":{
        type : String,
        required :true,
        unique : true
    },
    "email": {
        type : String,
        required : true,
        unique : true
    },
    "phone" : {
        type : String,
        required :true,
        unique : true
    }
},{
    timestamps : true,
    versionKey : false
})


const UserModel = mongoose.model("user",UserSchema)


export {
    UserModel
}