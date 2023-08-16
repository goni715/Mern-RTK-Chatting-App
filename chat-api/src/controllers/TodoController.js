const TodoModel = require("../models/TodoModel");

const CreateService = require("../services/common/CreateService");
const GetAllService = require("../services/common/GetAllService");
const DeleteService = require("../services/common/DeleteService");
const UpdateService = require("../services/common/UpdateService");



exports.CreateTodo=async (req, res) => {
    await CreateService(req,res,TodoModel);
}

exports.GetAllTodos=async(req,res)=>{
    const projection = {$project: {_id:1, name:1}}
    await GetAllService(req,res,TodoModel, projection)
}

exports.DeleteTodo=async(req,res)=>{
    await DeleteService(req,res,TodoModel)
}

exports.UpdateTodo=async(req,res)=>{
    await UpdateService(req,res,TodoModel)
}

