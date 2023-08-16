const UsersModel = require("../models/UsersModel");

const GetAllUsersService = require('../services/user/GetAllUsersService');
const UserLoginService = require("../services/user/UserLoginService");
const UserCreateService = require("../services/user/UserCreateService");




exports.Registration=async (req, res) => {
    await UserCreateService(req,res,UsersModel)
}



exports.Login=async(req,res)=>{
    await UserLoginService(req,res,UsersModel)
}



exports.GetAllUser=async(req,res)=>{
    let Result=await GetAllUsersService(req,UsersModel)
    res.status(200).json(Result)
}


