const  mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    userName:{
        type:String
    },
    picture:{
        type:String
    },
    password:{type:String},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});

const UsersModel=mongoose.model('users',DataSchema);
module.exports=UsersModel

